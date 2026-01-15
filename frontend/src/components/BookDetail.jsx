import React from "react";

const BookDetail = ({
  open, // Boolean to control modal visibility
  onClose, // Function to close the modal
  coverUrl, // URL for the main cover image
  title, // Book title
  description, // Detailed description
  subjects = [], // List of subjects/categories
  subject_places = [], // List of related places
  subject_times = [], // List of related time periods
  subject_people = [], // List of related people/characters
  covers = [], // Array of additional cover image IDs
  links = [], // Array of external links [{ title, url }]
  onBuy, // Function to handle purchase
}) => {
  // Limits for displaying tags and items to avoid overcrowding
  const MAX_SUBJECTS = 12;
  const MAX_PLACES = 8;
  const MAX_TIMES = 5;
  const MAX_PEOPLE = 10;
  const MAX_COVERS = 8;
  const MAX_LINKS = 5;

  return (
    // Dialog Modal
    <dialog className={`modal ${open ? "modal-open" : ""}`} onClose={onClose}>
      <div className="modal-box max-w-5xl">
        {/* Close Button */}
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Images */}
          <div>
            <img
              src={coverUrl}
              alt={title}
              className="w-full h-80 object-cover rounded-lg"
            />

            {/* Additional Covers Gallery */}
            {Array.isArray(covers) && covers.length > 1 && (
              <div className="mt-3">
                <h4 className="font-semibold mb-2">Other Covers</h4>
                <div className="flex flex-wrap gap-2">
                  {covers.slice(0, MAX_COVERS).map((id, idx) => (
                    <img
                      key={`${id}-${idx}`}
                      src={`https://covers.openlibrary.org/b/id/${id}-S.jpg`}
                      alt={`Cover ${idx + 1}`}
                      className="w-14 h-20 object-cover rounded"
                    />
                  ))}
                  {/* Badge for remaining covers */}
                  {covers.length > MAX_COVERS && (
                    <span className="badge badge-ghost">
                      +{covers.length - MAX_COVERS} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Details */}
          <div>
            <div>
              <div className="text-xs uppercase text-base-content/60">
                Book Title
              </div>
              <h2 className="text-2xl font-bold">{title}</h2>
            </div>

            {/* Description Section */}
            {description && (
              <div className="mt-3">
                <div className="text-xs uppercase text-base-content/60">
                  Description / Summary
                </div>
                <p className="mt-1 text-base-content/80 whitespace-pre-line">
                  {description}
                </p>
              </div>
            )}

            {/* Subjects Tags */}
            {subjects?.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold">Subjects</h4>
                <div className="mt-1 flex flex-wrap gap-2">
                  {subjects.slice(0, MAX_SUBJECTS).map((s, i) => (
                    <span key={i} className="badge badge-outline">
                      {s}
                    </span>
                  ))}
                  {subjects.length > MAX_SUBJECTS && (
                    <span className="badge badge-ghost">
                      +{subjects.length - MAX_SUBJECTS} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Places Tags */}
            {subject_places?.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold">Places</h4>
                <div className="mt-1 flex flex-wrap gap-2">
                  {subject_places.slice(0, MAX_PLACES).map((s, i) => (
                    <span key={i} className="badge badge-ghost">
                      {s}
                    </span>
                  ))}
                  {subject_places.length > MAX_PLACES && (
                    <span className="badge badge-ghost">
                      +{subject_places.length - MAX_PLACES} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Time Periods Tags */}
            {subject_times?.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold">Time Periods</h4>
                <div className="mt-1 flex flex-wrap gap-2">
                  {subject_times.slice(0, MAX_TIMES).map((s, i) => (
                    <span key={i} className="badge badge-ghost">
                      {s}
                    </span>
                  ))}
                  {subject_times.length > MAX_TIMES && (
                    <span className="badge badge-ghost">
                      +{subject_times.length - MAX_TIMES} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Characters/People Tags */}
            {subject_people?.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold">Characters / People</h4>
                <div className="mt-1 flex flex-wrap gap-2">
                  {subject_people.slice(0, MAX_PEOPLE).map((s, i) => (
                    <span key={i} className="badge badge-ghost">
                      {s}
                    </span>
                  ))}
                  {subject_people.length > MAX_PEOPLE && (
                    <span className="badge badge-ghost">
                      +{subject_people.length - MAX_PEOPLE} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* External Links and Buy Button */}
            {(links?.length > 0 || onBuy) && (
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {links.slice(0, MAX_LINKS).map((l, i) => (
                  <a
                    key={i}
                    href={l.url}
                    target="_blank"
                    rel="noreferrer"
                    className="link link-primary"
                    title={l.title}
                  >
                    {l.title || "External Link"}
                  </a>
                ))}
                {links.length > MAX_LINKS && (
                  <span className="text-sm text-base-content/60">
                    +{links.length - MAX_LINKS} more links…
                  </span>
                )}
                {onBuy && (
                  <button className="btn btn-primary ml-auto" onClick={onBuy}>
                    Buy Now
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Backdrop to close modal when clicking outside */}
      <form method="dialog" className="modal-backdrop" onClick={onClose}>
        <button>close</button>
      </form>
    </dialog>
  );
};

export default BookDetail;
