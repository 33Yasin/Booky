import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-base-200 text-base-content border-t border-base-300">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
                    {/* Marka */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary/10 text-primary rounded-xl p-2">
                                <svg width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="fill-current">
                                    <path d="M3 4.5A1.5 1.5 0 0 1 4.5 3h10.75A3.75 3.75 0 0 1 19 6.75V19.5a.5.5 0 0 1-.777.416L14 17.25l-4.223 2.666A.5.5 0 0 1 9 19.5V6a2 2 0 0 0-2-2H4.5A1.5 1.5 0 0 1 3 2.5z"/>
                                </svg>
                            </div>
                            <div>
                                <p className="font-bold text-lg">Booky</p>
                                <p className="text-sm text-base-content/70">Kitap keşfet, takip et, sipariş ver.</p>
                            </div>
                        </div>
                        <p className="text-sm text-base-content/70">Binlerce kitap arasından dilediğini bul, favori yazarlarını takip et ve yeni çıkanlardan haberdar ol.</p>
                    </div>

                    {/* Faydalı Linkler */}
                    <div className="grid grid-cols-2 gap-4 md:gap-6">
                        <div>
                            <h4 className="font-semibold mb-2">Keşfet</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a className="link link-hover">Ana Sayfa</a></li>
                                <li><a className="link link-hover">Kategoriler</a></li>
                                <li><a className="link link-hover">En Çok Satanlar</a></li>
                                <li><a className="link link-hover">Yeni Çıkanlar</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">Hakkımızda</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a className="link link-hover">Biz Kimiz?</a></li>
                                <li><a className="link link-hover">İletişim</a></li>
                                <li><a className="link link-hover">Yardım</a></li>
                                <li><a className="link link-hover">SSS</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Sosyal */}
                    <div className="md:justify-self-end">
                        <h4 className="font-semibold mb-2">Bizi takip edin</h4>
                        <div className="flex items-center gap-3">
                            <a aria-label="Twitter" className="btn btn-circle btn-ghost text-base-content hover:text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                            </a>
                            <a aria-label="YouTube" className="btn btn-circle btn-ghost text-base-content hover:text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                            </a>
                            <a aria-label="Facebook" className="btn btn-circle btn-ghost text-base-content hover:text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-base-300 mt-8 pt-4 text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-between gap-2 text-base-content/70">
                    <p> {new Date().getFullYear()} Booky • Tüm hakları saklıdır.</p>
                    <div className="flex items-center gap-4">
                        <a className="link link-hover">KVKK</a>
                        <a className="link link-hover">Gizlilik</a>
                        <a className="link link-hover">Kullanım Şartları</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer