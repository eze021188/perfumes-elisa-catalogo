// src/pages/CatalogPage.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { supabase } from '../supabaseClient';
import toast from 'react-hot-toast';

// --- Íconos PNG ---
const WhatsAppIcon = () => (
    <img src="/imagen/iconos/whatsapp-bn.jpg" alt="WhatsApp" className="h-5 w-5 mr-1.5" />
);
const FacebookIcon = () => (
    <img src="/imagen/iconos/facebook-bn.jpg" alt="Facebook" className="h-5 w-5 mr-1.5" />
);
const InstagramIcon = () => (
    <img src="/imagen/iconos/instagram-bn.jpg" alt="Instagram" className="h-5 w-5 mr-1.5" />
);
const EmailIcon = () => (
    <img src="/imagen/iconos/email-bn.jpg" alt="Correo Electrónico" className="h-4 w-4 mr-1.5" />
);
const LocationIcon = () => (
    <img src="/imagen/iconos/location-bn.jpg" alt="Ubicación" className="h-4 w-4 mr-1.5" />
);
const TruckIcon = () => (
    <img src="/imagen/iconos/truck-bn.jpg" alt="Entrega" className="h-5 w-5 mr-2" />
);

// --- Componentes auxiliares ---
function SearchBar({ onSearch }) {
    return (
        <div className="flex items-center bg-white rounded-lg shadow px-4 py-2 w-full max-w-xs md:max-w-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1111.5 4.5a7.5 7.5 0 015.15 12.15z" />
            </svg>
            <input type="text" placeholder="Buscar..." className="w-full outline-none text-gray-700 bg-transparent text-sm" onChange={e => onSearch(e.target.value)} />
        </div>
    );
}

function CategoryFilters({ categories, selected, onSelect }) {
    return (
        <nav className="hidden md:flex items-center space-x-2">
            {categories.map(cat => (
                <button key={cat} onClick={() => onSelect(cat)}
                    className={`px-3 py-1 rounded-full font-medium text-sm ${selected === cat ? 'bg-black text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} shadow-sm transition-colors duration-200`}>
                    {cat}
                </button>
            ))}
        </nav>
    );
}

function ViewToggle({ view, onChange }) {
    return (
        <div className="hidden md:flex items-center space-x-2">
            <button onClick={() => onChange('grid')} className={`p-1 rounded ${view === 'grid' ? 'text-black bg-gray-200' : 'text-gray-500 hover:bg-gray-100'} transition-colors duration-200`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4h6v6H4V4zM14 4h6v6h-6V4zM4 14h6v6H4v-6zM14 14h6v6h-6v-6z" /></svg>
            </button>
            <button onClick={() => onChange('list')} className={`p-1 rounded ${view === 'list' ? 'text-black bg-gray-200' : 'text-gray-500 hover:bg-gray-100'} transition-colors duration-200`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
        </div>
    );
}

function CartButton({ count, onClick }) {
    return (
        <button onClick={onClick} className="relative bg-black text-white p-2 rounded-full shadow hover:bg-gray-800 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m12-9l2 9m-6-9v9" /></svg>
            {count > 0 && (<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{count}</span>)}
        </button>
    );
}

const formatCurrency = (amount) => {
     const numericAmount = parseFloat(amount);
     if (isNaN(numericAmount)) return '$0.00';
     return numericAmount.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 });
};

// --- Componente Modal Detalle Producto ---
function ProductDetailModal({ product, onClose, onAddToCart, formatCurrency }) {
    if (!product) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" aria-labelledby="product-detail-modal-title" role="dialog" aria-modal="true">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
                {/* Cabecera de la Modal */}
                <div className="flex justify-between items-center p-4 sm:p-5 border-b border-gray-200">
                    <h3 id="product-detail-modal-title" className="text-lg sm:text-xl font-semibold text-gray-900">{product.nombre}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1" aria-label="Cerrar detalle de producto">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                {/* Cuerpo de la Modal */}
                <div className="p-4 sm:p-6 overflow-y-auto grid sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* Sección de Imagen */}
                    <div className="sm:order-1">
                        <img 
                            src={product.imagenUrl || 'https://placehold.co/600x600?text=No+Image'} 
                            alt={product.nombre} 
                            className="w-full h-auto object-contain rounded-md max-h-[300px] sm:max-h-[400px] border border-gray-200"
                            onError={e => { e.target.src = 'https://placehold.co/600x600?text=No+Image'; e.target.onerror = null; }}
                        />
                    </div>

                    {/* Sección de Detalles */}
                    <div className="sm:order-2 flex flex-col">
                        {/* Precio */}
                        <div className="mb-3">
                            {product.promocion !== null && product.promocion < product.precio ? (
                                <>
                                    <span className="text-gray-400 line-through text-md sm:text-lg">{formatCurrency(product.precio)}</span>
                                    <span className="text-green-600 font-bold text-xl sm:text-2xl ml-2">{formatCurrency(product.promocion)}</span>
                                </>
                            ) : (
                                <p className="text-gray-800 font-bold text-xl sm:text-2xl">{formatCurrency(product.precio)}</p>
                            )}
                        </div>
                        {/* Categoría */}
                        <div className="mb-3 text-sm text-gray-600">
                            <span className="font-medium text-gray-700">Categoría:</span> {product.categoria || 'No especificada'}
                        </div>
                        {/* Disponibles */}
                        <div className="mb-4 text-sm text-gray-600">
                            <span className="font-medium text-gray-700">Disponibles:</span> {product.stock}
                        </div>

                        {/* === MODIFICACIÓN AQUÍ para DESCRIPCIÓN HTML === */}
                        <h4 className="font-semibold text-gray-800 mb-1 mt-2 text-md">Descripción Detallada:</h4>
                        {product.descripcion_html ? (
                            <div 
                                className="prose prose-sm max-w-none text-gray-700 mb-4 flex-grow min-h-[60px]" // Clases para estilizar HTML, 'prose' es de Tailwind Typography
                                dangerouslySetInnerHTML={{ __html: product.descripcion_html }} 
                            />
                        ) : (
                            <p className="text-gray-700 text-sm mb-4 whitespace-pre-wrap flex-grow min-h-[60px]">
                                {product.descripcion || "No hay descripción detallada para este producto."}
                            </p>
                        )}
                        {/* === FIN DE LA MODIFICACIÓN === */}
                        
                        {/* Botón Añadir al Carrito */}
                        <div className="mt-auto">
                            <button
                                onClick={() => onAddToCart(product)}
                                disabled={product.stock <= 0}
                                className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-md font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm"
                            >
                                {product.stock > 0 ? 'Agregar al carrito' : 'Agotado'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- Componente Principal ---
export default function CatalogPage() {
    const [productos, setProductos] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const categorias = ['INICIO', 'FRAGANCIA FEMENINA', 'FRAGANCIA MASCULINA', 'UNISEX'];
    const [selectedCat, setSelectedCat] = useState('INICIO');
    const [viewMode, setViewMode] = useState('grid');
    const [cartItems, setCartItems] = useState([]);
    const [selectedProductDetail, setSelectedProductDetail] = useState(null);
    const [isProductDetailModalOpen, setIsProductDetailModalOpen] = useState(false);

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            // Asegúrate de que tu tabla 'productos' en Supabase tenga la columna 'descripcion_html'
            // y que el select('*') la esté trayendo.
            const { data, error } = await supabase.from('productos').select('*');
            if (error) {
                console.error('Error fetching products:', error); setError(error); toast.error('Error al cargar los productos.');
            } else {
                const productsWithPublicUrls = data.map(p => {
                    let imagenUrl = '';
                    if (p.imagen && supabase.storage) {
                         const { data: publicUrlData } = supabase.storage.from('productos').getPublicUrl(p.imagen);
                         imagenUrl = publicUrlData?.publicUrl || '';
                    } else if (p.imagenUrl || p.imagen_url) { imagenUrl = p.imagenUrl || p.imagen_url; }
                    if (!imagenUrl || imagenUrl.includes('null')) {
                        imagenUrl = 'https://placehold.co/400x400?text=No+Image';
                    }
                     const stockNumerico = parseFloat(p.stock) || 0;
                     const precioNumerico = parseFloat(p.precio) || 0;
                     const promocionNumerica = parseFloat(p.promocion);
                     // No es necesario modificar nada aquí si 'descripcion_html' ya viene en 'p'
                     return { 
                        ...p, 
                        imagenUrl, 
                        stock: stockNumerico, 
                        precio: precioNumerico, 
                        promocion: isNaN(promocionNumerica) ? null : promocionNumerica 
                        // descripcion_html: p.descripcion_html (ya está incluido por el ...p)
                    };
                });
                setProductos(productsWithPublicUrls); setFiltered(productsWithPublicUrls);
            }
            setLoading(false);
        }
        fetchProducts();
    }, []);

    useEffect(() => {
        let temp = productos;
        if (selectedCat && selectedCat !== 'INICIO') { temp = temp.filter(p => p.categoria === selectedCat); }
        if (searchTerm) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            temp = temp.filter(p => 
                p.nombre.toLowerCase().includes(lowerCaseSearchTerm) || 
                (p.descripcion && p.descripcion.toLowerCase().includes(lowerCaseSearchTerm)) ||
                // Opcional: también buscar en la descripción HTML si lo deseas
                (p.descripcion_html && p.descripcion_html.toLowerCase().includes(lowerCaseSearchTerm))
            );
        }
        setFiltered(temp);
    }, [searchTerm, selectedCat, productos]);
    
    const addToCart = producto => {
        const currentStock = parseFloat(producto.stock) || 0;
        const itemInCart = cartItems.find(item => item.id === producto.id);
        const currentQuantityInCart = itemInCart ? itemInCart.qty : 0;
        if (currentStock <= currentQuantityInCart) { toast.error(`Stock insuficiente para ${producto.nombre}. Disponible: ${currentStock}`); return; }
        setCartItems(prev => {
            if (itemInCart) return prev.map(item => item.id === producto.id ? { ...item, qty: item.qty + 1 } : item);
            return [...prev, { ...producto, qty: 1 }];
        });
         toast.success(`${producto.nombre} añadido a la solicitud.`);
    };
    const decrementItem = (productId) => {
        setCartItems(prev => {
            const itemToUpdate = prev.find(item => item.id === productId);
            if (!itemToUpdate) return prev;
            if (itemToUpdate.qty <= 1) { toast(`Eliminado ${itemToUpdate.nombre} de la solicitud.`, { icon: '🗑️' }); return prev.filter(item => item.id !== productId); }
            return prev.map(item => item.id === productId ? { ...item, qty: item.qty - 1 } : item);
        });
    };
    const removeItem = (productId) => {
        setCartItems(prev => {
            const itemToRemove = prev.find(item => item.id === productId);
            if (itemToRemove) toast(`Eliminado ${itemToRemove.nombre} de la solicitud.`, { icon: '🗑️' });
            return prev.filter(item => item.id !== productId);
        });
    };
    const calculateDiscountPercentage = (originalPrice, salePrice) => {
        const original = parseFloat(originalPrice); const sale = parseFloat(salePrice);
        if (isNaN(original) || isNaN(sale) || original <= 0 || sale >= original) return null;
        return Math.round(((original - sale) / original) * 100);
    };
    const handleWhatsAppRequest = () => {
        if (cartItems.length === 0) { toast.error("El carrito está vacío."); return; }
        const phoneNumber = '528130804010';
        let message = "¡Hola! Me gustaría solicitar los siguientes productos:\n\n";
        cartItems.forEach(item => {
            const itemPrice = formatCurrency(item.promocion !== null ? item.promocion : item.precio);
            message += `- ${item.qty}x ${item.nombre} - ${itemPrice}\n`;
        });
        message += "\nPor favor, confirmar disponibilidad y detalles de entrega/recogida.";
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
        setIsCartOpen(false);
    };

    const handleProductClick = (product) => {
        setSelectedProductDetail(product);
        setIsProductDetailModalOpen(true);
    };
    const closeProductDetailModal = () => {
        setIsProductDetailModalOpen(false);
        setSelectedProductDetail(null);
    };
    const handleAddToCartFromDetail = (product) => {
        addToCart(product);
    };

    if (loading) return <div className="text-center p-8 text-gray-700">Cargando productos...</div>;
    if (error) return <div className="text-center p-8 text-red-600">Error: {error.message}</div>;

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
             <header className="fixed top-0 left-0 right-0 bg-white shadow z-20">
                 <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
                     <button className="lg:hidden p-2 text-gray-800 rounded-md hover:bg-gray-100" onClick={() => setIsSidebarOpen(!isSidebarOpen)} aria-label="Toggle menu">
                          {isSidebarOpen ? (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>) : (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>)}
                     </button>
                     <SearchBar onSearch={setSearchTerm} />
                     <img src="/imagen/PERFUMESELISAwhite.jpg" alt="Perfumes Elisa Logo" className="h-12 object-contain hidden lg:block" />
                     <div className="flex items-center space-x-4">
                          <CategoryFilters categories={categorias} selected={selectedCat} onSelect={setSelectedCat} />
                          <ViewToggle view={viewMode} onChange={setViewMode} />
                          <CartButton count={cartItems.reduce((sum, i) => sum + i.qty, 0)} onClick={() => setIsCartOpen(true)} />
                     </div>
                 </div>
             </header>

            <main className="pt-16 flex flex-1">
                <aside className={`fixed lg:static inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-white shadow-lg lg:shadow-none z-40 overflow-y-auto px-6 pb-6 pt-16 lg:p-6`}>
                     <div className="mb-8 text-center lg:hidden">
                         <img src="/imagen/PERFUMESELISAwhite.jpg" alt="Logo Perfumes Elisa" className="mx-auto h-16 w-auto" />
                     </div>
                    <div className="mb-6 border-b border-gray-200 pb-4">
                        <h3 className="font-semibold text-gray-800 mb-2 text-sm">ENTRA EN CONTACTO</h3>
                        <div className="text-xs space-y-2">
                             <a href="https://wa.me/528130804010" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 hover:text-black">
                                 <WhatsAppIcon /> +528130804010
                             </a>
                             <a href="https://www.facebook.com/perfumeselisa/" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 hover:text-black">
                                 <FacebookIcon /> Perfumes Elisa
                             </a>
                              <a href="https://www.instagram.com/perfumeselisa/" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 hover:text-black">
                                 <InstagramIcon /> @perfumeselisa
                             </a>
                              <a href="mailto:contacto@perfumeselisa.com" className="flex items-center text-gray-700 hover:text-black">
                                 <EmailIcon /> contacto@perfumeselisa.com
                             </a>
                              <p className="flex items-center text-gray-700"><LocationIcon /> Apodaca, N. L.</p>
                         </div>
                    </div>
                    <div className="mb-6 pt-4 border-t border-gray-200">
                        <h3 className="font-semibold text-gray-700 mb-3 text-sm flex items-center"><TruckIcon /> OPCIONES DE ENTREGA</h3>
                        <div className="text-gray-600 text-xs space-y-2">
                             <p>Entregas personales en puntos establecidos. (Consulta ubicaciones)</p>
                             <p>Envíos locales en la Zona Metropolitana de MTY desde $80.</p>
                             <p>Envíos por Uber, Didi o cualquier otra plataforma que sugiera el cliente.</p>
                             <p>Envíos nacionales desde $139. (Sin seguro)</p>
                             <p>Retirar en domicilio.</p>
                         </div>
                    </div>
                    {isSidebarOpen && (
                        <button className="lg:hidden absolute top-4 right-4 p-2 bg-gray-200 text-gray-800 rounded-md mt-16" onClick={() => setIsSidebarOpen(false)} aria-label="Cerrar menú">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    )}
                </aside>

                <section className="flex-1 p-6 lg:ml-64">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">{selectedCat} {selectedCat !== 'INICIO' && (<span className="text-gray-500 text-base font-normal cursor-pointer hover:underline" onClick={() => setSelectedCat('INICIO')}>(Ver todo)</span>)}</h2>
                    {filtered.length === 0 && !loading && !error ? (<p className="text-center text-gray-500 mt-8">No se encontraron productos que coincidan con tu búsqueda o filtro.</p>) : 
                    viewMode === 'grid' ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 md:gap-8">
                            {filtered.map(p => { const disc = calculateDiscountPercentage(p.precio, p.promocion); return (
                                <div key={p.id} onClick={() => handleProductClick(p)} className="bg-white rounded-lg overflow-hidden shadow-md relative flex flex-col cursor-pointer hover:shadow-lg transition-shadow duration-200">
                                    {disc != null && (<span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">-{disc}%</span>)}
                                    <div className="w-full h-64 overflow-hidden bg-gray-100">
                                        {p.imagenUrl ? (<img src={p.imagenUrl} alt={p.nombre} className="w-full h-full object-cover object-center" onError={e => { e.target.src = 'https://placehold.co/400x400?text=No+Image'; e.target.onerror = null; }} />) : 
                                        (<div className="w-full h-full flex items-center justify-center text-gray-500 text-sm p-4">No Image</div>)}
                                    </div>
                                    <div className="p-4 flex flex-col flex-grow">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">{p.nombre}</h3>
                                        {p.promocion !== null && p.promocion < p.precio ? (
                                        <div className="flex items-baseline space-x-2 mb-2"><span className="text-gray-500 line-through text-sm">{formatCurrency(p.precio)}</span><span className="text-green-600 font-bold text-lg">{formatCurrency(p.promocion)}</span></div>) : 
                                        (<p className="text-gray-700 font-bold text-lg mb-2">{formatCurrency(p.precio)}</p>)}
                                        <p className="text-sm text-gray-600">Stock: <span className="font-medium">{p.stock}</span></p>
                                        <div className="flex justify-end mt-auto pt-2">
                                            <button onClick={(e) => { e.stopPropagation(); addToCart(p);}} disabled={p.stock <= 0} className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 transition-colors text-xs" title="Agregar al carrito" aria-label={`Agregar ${p.nombre} al carrito`}>+</button>
                                        </div>
                                    </div>
                                </div>);
                            })}
                        </div>
                    ) : ( 
                        <ul className="space-y-4">
                            {filtered.map(p => (
                                <li key={p.id} onClick={() => handleProductClick(p)} className="bg-white p-4 rounded shadow flex items-center justify-between cursor-pointer hover:shadow-lg transition-shadow duration-200">
                                    <div className="flex items-center space-x-4 flex-1 min-w-0">
                                        <img src={p.imagenUrl || 'https://placehold.co/80x80?text=No+Image'} alt={p.nombre} className="w-20 h-20 object-cover rounded flex-shrink-0" onError={e => { e.target.src = 'https://placehold.co/80x80?text=No+Image'; e.target.onerror = null; }} />
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-gray-900 truncate">{p.nombre}</h4>
                                            <div className="mt-1">{p.promocion !== null && p.promocion < p.precio ? (<><span className="text-green-600 font-bold">{formatCurrency(p.promocion)}</span><span className="text-gray-400 line-through ml-2 text-sm">{formatCurrency(p.precio)}</span></>) : (<span className="font-bold text-gray-700">{formatCurrency(p.precio)}</span>)}</div>
                                            <p className="text-sm text-gray-600 mt-1">Stock: <span className="font-medium">{p.stock}</span></p>
                                        </div>
                                    </div>
                                    <button onClick={(e) => { e.stopPropagation(); addToCart(p);}} disabled={p.stock <= 0} className="bg-black text-white p-2 rounded-full disabled:opacity-50 transition-colors ml-4 flex-shrink-0 text-xs" title="Agregar al carrito" aria-label={`Agregar ${p.nombre} al carrito`}>+</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </main>

            {(isSidebarOpen || isCartOpen || isProductDetailModalOpen) && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => { if (isSidebarOpen) setIsSidebarOpen(false); if (isCartOpen) setIsCartOpen(false); if (isProductDetailModalOpen) closeProductDetailModal();}} aria-hidden="true"></div>
            )}

            {isCartOpen && ( 
                <div className="fixed inset-0 z-40 flex items-center justify-center p-4"  aria-labelledby="cart-modal-title" role="dialog" aria-modal="true">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[85vh] flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center p-4 border-b border-gray-200">
                            <h2 id="cart-modal-title" className="text-lg font-semibold text-gray-900">Carrito ({cartItems.reduce((sum, i) => sum + i.qty, 0)})</h2>
                            <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-gray-600" aria-label="Cerrar carrito">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto space-y-4">
                            {cartItems.length === 0 ? (<p className="text-gray-500 italic text-center py-4">Tu carrito está vacío.</p>) : 
                            (<ul className="divide-y divide-gray-200 -my-4">{cartItems.map(item => (
                                <li key={item.id} className="flex items-center justify-between py-4">
                                    <div className="flex items-center space-x-3">
                                        <img src={item.imagenUrl || 'https://placehold.co/60x60?text=No+Image'} alt={item.nombre} className="w-16 h-16 object-cover rounded border border-gray-200" onError={e => { e.target.src = 'https://placehold.co/60x60?text=No+Image'; e.target.onerror = null; }} />
                                        <div className="flex-1"><p className="font-medium text-sm text-gray-900 leading-tight">{item.nombre}</p><p className="text-gray-600 text-sm">{formatCurrency(item.promocion !== null ? item.promocion : item.precio)}</p></div>
                                    </div>
                                    <div className="flex items-center space-x-2 ml-3">
                                        <button onClick={() => decrementItem(item.id)} className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30" disabled={item.qty <= 1} title="Disminuir cantidad" aria-label={`Disminuir cantidad de ${item.nombre}`}><svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg></button>
                                        <span className="font-semibold text-gray-800 w-5 text-center text-sm">{item.qty}</span>
                                        <button onClick={() => addToCart(item)} className="p-1 text-green-600 hover:text-green-700 disabled:opacity-30" disabled={item.qty >= item.stock} title="Aumentar cantidad" aria-label={`Aumentar cantidad de ${item.nombre}`}><svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg></button>
                                        <button onClick={() => removeItem(item.id)} className="p-1 text-red-500 hover:text-red-700 ml-1" title="Eliminar ítem" aria-label={`Eliminar ${item.nombre} del carrito`}><svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                                    </div>
                                </li>))}
                            </ul>)}
                        </div>
                        {cartItems.length > 0 && (
                            <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
                                <button onClick={handleWhatsAppRequest} disabled={cartItems.length === 0} className="w-full bg-green-600 text-white py-2.5 px-4 rounded-md font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 text-sm">Solicitar por WhatsApp ({cartItems.reduce((sum, i) => sum + i.qty, 0)})</button>
                            </div>)}
                    </div>
                </div>
            )}

            {isProductDetailModalOpen && selectedProductDetail && (
                <ProductDetailModal 
                    product={selectedProductDetail} 
                    onClose={closeProductDetailModal}
                    onAddToCart={handleAddToCartFromDetail}
                    formatCurrency={formatCurrency}
                />
            )}
        </div>
    );
}