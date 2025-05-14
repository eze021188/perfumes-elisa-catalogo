// api/get-fragrantica-details.js (o api/get-notino-details.js)
import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
    const { url: targetUrl } = req.query;

    if (!targetUrl) {
        return res.status(400).json({ error: 'El parámetro URL es requerido.' });
    }

    try {
        console.log(`[SCRAPER] Iniciando fetch para: ${targetUrl}`);
        const { data: html } = await axios.get(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36',
                'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
            },
            timeout: 15000
        });

        const $ = cheerio.load(html);
        console.log(`[SCRAPER] HTML cargado para: ${targetUrl}. Longitud: ${html.length}`);

        // --- LÓGICA DE SCRAPING ESPECÍFICA PARA NOTINO.ES ---
        // ¡¡DEBES VERIFICAR Y AJUSTAR ESTOS SELECTORES INSPECCIONANDO LA PÁGINA REAL!!
        // Las clases como sc-xxxx pueden cambiar. Los IDs son más estables.

        // 1. Nombre del Perfume
        // El HTML que pasaste: <span class="sc-aohf13-11 gzhTSh">Afnan 9 PM Pour Femme</span>
        // Es importante verificar si hay un h1 o un selector más semántico en la página real.
        let perfumeName = $('span.sc-aohf13-11.gzhTSh').first().text().trim();
        if (!perfumeName) { // Fallback si la clase cambia o no se encuentra
             // Intenta buscar un h1 que pueda contener el nombre
            perfumeName = $('h1').first().text().trim();
        }


        // 2. Descripción Principal
        // El HTML: <div id="pd-description-text" ...><p>Disfruta de una fragancia...</p>...</div>
        let description = $('div#pd-description-text p').first().text().trim();
        
        // También podrías querer las características de la lista <ul>
        const characteristics = [];
        $('div#pd-description-text ul li').each((i, el) => {
            characteristics.push($(el).text().trim());
        });

        // 3. Notas y Tipo de Fragancia (de la tabla)
        // El HTML: <table class="sc-1eu1dd2-4 kBrqUs"><tbody><tr class="sc-1eu1dd2-8 dEKhKi">...</tr></tbody></table>
        const notesAndType = {};
        $('table.sc-1eu1dd2-4.kBrqUs tr.sc-1eu1dd2-8').each((i, row) => {
            const labelElement = $(row).find('td.sc-1eu1dd2-6 div.sc-j2vy08-0'); // Intenta ser más específico para la etiqueta
            const valueElement = $(row).find('td.sc-1eu1dd2-7');

            const label = labelElement.text().trim();
            const value = valueElement.text().trim();

            if (label && value) {
                // Convertir la etiqueta a una clave más útil (ej. "Notas de cabeza" -> "notas_de_cabeza")
                const key = label.toLowerCase().replace(/\s+/g, '_').replace(/_de_/g, '_');
                notesAndType[key] = value.split(',').map(note => note.trim()); // Separa las notas por coma
            }
        });

        // 4. Imagen Principal (Necesitarás inspeccionar la página para encontrar el selector correcto)
        // EJEMPLO HIPOTÉTICO - ¡DEBES ENCONTRAR EL SELECTOR REAL!
        // let mainImageUrl = $('div.product-image-container img').attr('src');
        // if (mainImageUrl && !mainImageUrl.startsWith('http')) {
        //    mainImageUrl = targetUrl.substring(0, targetUrl.indexOf('/', 8)) + mainImageUrl; // Completar URL relativa
        // }
        let mainImageUrl = "Selector de imagen no definido aún"; // Placeholder


        const extractedData = {
            requestedUrl: targetUrl,
            perfumeName: perfumeName || "Nombre no encontrado",
            description: description || "Descripción no encontrada.",
            characteristics: characteristics.length > 0 ? characteristics : [],
            notesAndType: notesAndType, // Esto contendrá notas_de_cabeza, notas_de_corazon, etc.
            mainImageUrl: mainImageUrl || "Imagen no encontrada",
        };
        
        console.log("[SCRAPER] Datos extraídos:", JSON.stringify(extractedData, null, 2));
        res.status(200).json(extractedData);

    } catch (error) {
        console.error(`[SCRAPER] Error al procesar ${targetUrl}:`, error.message);
        let errorMessage = 'No se pudo obtener la información del producto.';
        let statusCode = 500;

        if (error.isAxiosError) {
            if (error.response) {
                console.error('[SCRAPER] Status de error de Axios:', error.response.status);
                errorMessage = `Error al contactar el sitio externo: Código ${error.response.status}`;
                statusCode = error.response.status;
            } else if (error.request) {
                console.error('[SCRAPER] No se recibió respuesta de Axios:', error.request);
                errorMessage = 'No se recibió respuesta del sitio externo (timeout o error de red).';
                statusCode = 504; 
            }
        }
        
        res.status(statusCode).json({ 
            error: errorMessage, 
            details: error.message,
            targetUrlAttempted: targetUrl 
        });
    }
}