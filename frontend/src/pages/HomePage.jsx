import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BookCard from "../components/BookCard";
import CardSkeleton from "../components/CardSkeleton";
import Footer from "../components/Footer";
import BookDetail from "../components/BookDetail";
import CartModal from "../components/CartModal";
import { toast } from "react-hot-toast";

const HomePage = () => {
  // State for storing the list of books fetched from the API
  const [books, setBooks] = useState([]);

  // Loading and error states for network requests
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination / Infinite Scroll states
  const [visibleCount, setVisibleCount] = useState(15);
  const [loadingMore, setLoadingMore] = useState(false);

  // Cache for storing detailed work information (descriptions, subjects, etc.)
  // Structure: { [workKey]: { description, subjects, links, subject_places, ... } }
  const [workDetails, setWorkDetails] = useState({});

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null); // Currently selected book for the modal

  // Cart state management
  const [cartItems, setCartItems] = useState([]); // Array of items: {id, title, author, coverUrl, qty}
  const [cartOpen, setCartOpen] = useState(false); // Visibility of the cart modal

  const cartCount = cartItems.length;

  // Add item to cart
  const addToCart = ({ id, title, author, coverUrl }) => {
    // Check if item already exists to prevent duplicates (or increment quantity logic if preferred)
    setCartItems((prev) => {
      const exists = prev.some((it) => it.id === id);
      if (exists) return prev; // prevent duplicates for now
      return [...prev, { id, title, author, coverUrl, qty: 1 }];
    });
    if (title) toast.success(`${title} added to cart!`);
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((it) => it.id !== id));
  };

  // Handle checkout process (Demo only)
  const checkout = () => {
    if (cartItems.length === 0) return;
    toast.success("Purchase successful! (Demo)");
    setCartItems([]);
    setCartOpen(false);
  };

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  // Fetch books from OpenLibrary API
  const fetchBooks = async (q = "classics") => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(
          q
        )}&limit=100`
      );
      if (!res.ok) throw new Error("Failed to fetch books");
      const data = await res.json();
      const docs = Array.isArray(data.docs) ? data.docs : [];
      setBooks(docs);
      setVisibleCount(Math.min(15, docs.length));
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchBooks("popular books");
  }, []);

  // Infinite Scroll Listener
  useEffect(() => {
    const onScroll = () => {
      if (loadingMore || loading) return;
      // Check if user has scrolled near the bottom of the page
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
      if (nearBottom && visibleCount < books.length) {
        setLoadingMore(true);
        // Simulate network delay for loading more items
        setTimeout(() => {
          setVisibleCount((c) => Math.min(c + 15, books.length));
          setLoadingMore(false);
        }, 200);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [books.length, visibleCount, loadingMore, loading]);

  // Fetch additional details (description, covers, etc.) for visible books
  // This runs whenever the visible list of books changes
  useEffect(() => {
    const visible = books.slice(0, visibleCount);
    // Identify books that haven't been cached yet
    const missingKeys = visible
      .map((b) => b.key) // OpenLibrary Key (e.g. /works/OL123W)
      .filter(Boolean)
      .filter((k) => !workDetails[k] && k.startsWith("/works/"));

    if (missingKeys.length === 0) return;

    // Helper to fetch details for a single work
    const fetchDetail = async (workKey) => {
      try {
        const url = `https://openlibrary.org${workKey}.json`;
        const r = await fetch(url);
        if (!r.ok) throw new Error("detail fetch failed");
        const j = await r.json();

        // Extract relevant fields safely
        const description =
          typeof j.description === "string"
            ? j.description
            : (j.description && j.description.value) || "";
        const subjects = j.subjects || j.subject || [];
        const subject_places = j.subject_places || [];
        const subject_times = j.subject_times || [];
        const subject_people = j.subject_people || [];
        const covers = Array.isArray(j.covers) ? j.covers : [];
        const links = Array.isArray(j.links)
          ? j.links.map((l) => ({ title: l.title || "", url: l.url || "" }))
          : [];

        return {
          workKey,
          data: {
            description,
            subjects,
            links,
            subject_places,
            subject_times,
            subject_people,
            covers,
          },
        };
      } catch (e) {
        // Return empty data on failure to prevent infinite retries
        return {
          workKey,
          data: {
            description: "",
            subjects: [],
            links: [],
            subject_places: [],
            subject_times: [],
            subject_people: [],
            covers: [],
          },
        };
      }
    };

    // Parallel fetch for all missing details
    (async () => {
      const results = await Promise.all(missingKeys.map(fetchDetail));
      setWorkDetails((prev) => {
        const next = { ...prev };
        for (const { workKey, data } of results) next[workKey] = data;
        return next;
      });
    })();
  }, [books, visibleCount, workDetails]);

  return (
    <div>
      <Navbar
        showUserMenu
        onProfileClick={() => {
          /* TODO: go to profile page */
        }}
        onSettingsClick={() => {
          /* TODO: go to settings page */
        }}
        onLogoutClick={handleLogout}
        onSearch={(q) => {
          // Reset current state and fetch by query
          setSelected(null);
          setModalOpen(false);
          setWorkDetails({});
          setVisibleCount(0);
          setBooks([]);
          setError(null);
          window.scrollTo({ top: 0, behavior: "smooth" });
          fetchBooks(q);
        }}
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error Message */}
        {error && <div className="text-sm text-error">{error}</div>}

        {/* Book List Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.slice(0, visibleCount).map((b, idx) => {
              // Construct cover URL or use placeholder
              const coverUrl = b.cover_i
                ? `https://covers.openlibrary.org/b/id/${b.cover_i}-L.jpg`
                : `https://placehold.co/400x600?text=No+Cover`;

              // Handle missing data with default values
              const title = b.title || "Unknown Title";
              const author = Array.isArray(b.author_name)
                ? b.author_name[0]
                : b.author_name || "Unknown Author";
              const publishYear =
                b.first_publish_year ||
                (Array.isArray(b.publish_date)
                  ? b.publish_date[0]
                  : b.publish_date) ||
                "Unknown Year";
              const detail = workDetails[b.key] || {};
              return (
                <BookCard
                  key={`${b.key || idx}`}
                  coverUrl={coverUrl}
                  title={title}
                  author={author}
                  publishYear={publishYear}
                  description={detail.description}
                  subjects={detail.subjects}
                  links={detail.links}
                  onBuy={() =>
                    addToCart({
                      id: b.key || `${idx}`,
                      title,
                      author,
                      coverUrl,
                    })
                  }
                  onClick={() => {
                    setSelected({
                      b,
                      detail,
                      coverUrl,
                    });
                    setModalOpen(true);
                  }}
                />
              );
            })}
          </div>
        )}
        {loadingMore && !loading && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <CardSkeleton key={`more-${i}`} />
            ))}
          </div>
        )}
      </div>
      <BookDetail
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        coverUrl={selected?.coverUrl}
        title={selected?.b?.title || ""}
        description={selected?.detail?.description || ""}
        subjects={selected?.detail?.subjects || []}
        subject_places={selected?.detail?.subject_places || []}
        subject_times={selected?.detail?.subject_times || []}
        subject_people={selected?.detail?.subject_people || []}
        covers={selected?.detail?.covers || []}
        links={selected?.detail?.links || []}
        onBuy={() =>
          selected &&
          addToCart({
            id: selected?.b?.key || "detail",
            title: selected?.b?.title,
            author: selected?.b?.author_name?.[0],
            coverUrl: selected?.coverUrl,
          })
        }
      />
      <CartModal
        open={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onRemove={removeFromCart}
        onCheckout={checkout}
      />
      <Footer />
    </div>
  );
};
export default HomePage;
