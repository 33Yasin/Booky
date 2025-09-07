import React from 'react'

const BookDetail = ({
    open,
    onClose,
    coverUrl,
    title,
    description,
    subjects = [],
    subject_places = [],
    subject_times = [],
    subject_people = [],
    covers = [], // array of cover IDs
    links = [], // [{ title, url }]
    onBuy,
}) => {
    const MAX_SUBJECTS = 12;
    const MAX_PLACES = 8;
    const MAX_TIMES = 5;
    const MAX_PEOPLE = 10;
    const MAX_COVERS = 8;
    const MAX_LINKS = 5;

    return (
        <dialog className={`modal ${open ? 'modal-open' : ''}`} onClose={onClose}>
            <div className="modal-box max-w-5xl">
                <button
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={onClose}
                    aria-label="Kapat"
                >✕</button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <img
                            src={coverUrl}
                            alt={title}
                            className="w-full h-80 object-cover rounded-lg"
                        />

                        {Array.isArray(covers) && covers.length > 1 && (
                            <div className="mt-3">
                                <h4 className="font-semibold mb-2">Diğer Kapaklar</h4>
                                <div className="flex flex-wrap gap-2">
                                    {covers.slice(0, MAX_COVERS).map((id, idx) => (
                                        <img
                                            key={`${id}-${idx}`}
                                            src={`https://covers.openlibrary.org/b/id/${id}-S.jpg`}
                                            alt={`Cover ${idx + 1}`}
                                            className="w-14 h-20 object-cover rounded"
                                        />
                                    ))}
                                    {covers.length > MAX_COVERS && (
                                        <span className="badge badge-ghost">+{covers.length - MAX_COVERS} daha</span>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div>
                        <div>
                            <div className="text-xs uppercase text-base-content/60">Kitap Adı</div>
                            <h2 className="text-2xl font-bold">{title}</h2>
                        </div>
                        {description && (
                            <div className="mt-3">
                                <div className="text-xs uppercase text-base-content/60">Açıklama / özet</div>
                                <p className="mt-1 text-base-content/80 whitespace-pre-line">{description}</p>
                            </div>
                        )}

                        {subjects?.length > 0 && (
                            <div className="mt-4">
                                <h4 className="font-semibold">Konular</h4>
                                <div className="mt-1 flex flex-wrap gap-2">
                                    {subjects.slice(0, MAX_SUBJECTS).map((s, i) => (
                                        <span key={i} className="badge badge-outline">{s}</span>
                                    ))}
                                    {subjects.length > MAX_SUBJECTS && (
                                        <span className="badge badge-ghost">+{subjects.length - MAX_SUBJECTS} daha</span>
                                    )}
                                </div>
                            </div>
                        )}

                        {subject_places?.length > 0 && (
                            <div className="mt-4">
                                <h4 className="font-semibold">Kitabın Geçtiği Yerler</h4>
                                <div className="mt-1 flex flex-wrap gap-2">
                                    {subject_places.slice(0, MAX_PLACES).map((s, i) => (
                                        <span key={i} className="badge badge-ghost">{s}</span>
                                    ))}
                                    {subject_places.length > MAX_PLACES && (
                                        <span className="badge badge-ghost">+{subject_places.length - MAX_PLACES} daha</span>
                                    )}
                                </div>
                            </div>
                        )}

                        {subject_times?.length > 0 && (
                            <div className="mt-4">
                                <h4 className="font-semibold">Tarihsel Dönem</h4>
                                <div className="mt-1 flex flex-wrap gap-2">
                                    {subject_times.slice(0, MAX_TIMES).map((s, i) => (
                                        <span key={i} className="badge badge-ghost">{s}</span>
                                    ))}
                                    {subject_times.length > MAX_TIMES && (
                                        <span className="badge badge-ghost">+{subject_times.length - MAX_TIMES} daha</span>
                                    )}
                                </div>
                            </div>
                        )}

                        {subject_people?.length > 0 && (
                            <div className="mt-4">
                                <h4 className="font-semibold">Karakterler / Kişiler</h4>
                                <div className="mt-1 flex flex-wrap gap-2">
                                    {subject_people.slice(0, MAX_PEOPLE).map((s, i) => (
                                        <span key={i} className="badge badge-ghost">{s}</span>
                                    ))}
                                    {subject_people.length > MAX_PEOPLE && (
                                        <span className="badge badge-ghost">+{subject_people.length - MAX_PEOPLE} daha</span>
                                    )}
                                </div>
                            </div>
                        )}

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
                                    >{l.title || 'Dış bağlantı'}</a>
                                ))}
                                {links.length > MAX_LINKS && (
                                    <span className="text-sm text-base-content/60">+{links.length - MAX_LINKS} bağlantı daha…</span>
                                )}
                                {onBuy && (
                                    <button className="btn btn-primary ml-auto" onClick={onBuy}>Satın Al</button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop" onClick={onClose}>
                <button>close</button>
            </form>
        </dialog>
    )
}

export default BookDetail