Despliegue del Worker de seguridad

Pasos rápidos:

1. Inicia sesión con Wrangler (si no lo has hecho):

```bash
npx wrangler login
```

2. Desde esta carpeta, despliega el Worker para probar en `workers.dev`:

```bash
cd cloudflare/worker
npx wrangler deploy --config wrangler.toml
```

3. Para usarlo en tu dominio (en el borde), crea una ruta en el dashboard de Cloudflare que apunte a este Worker
   (Dashboard → Workers → Create route) o usa la API de Cloudflare para mapear la ruta de tu dominio.

Notas:
- Si quieres que el Worker actúe en `tescha.pages.dev`, debes añadir una ruta que coincida con ese host o configurar un Worker Service binding.
- Actualiza la lista de hashes en `index.mjs` cada vez que recompiles si ves bloqueos en la consola.
