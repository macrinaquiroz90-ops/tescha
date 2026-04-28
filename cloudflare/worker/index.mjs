// Worker que proxifica al origen y añade/reescribe headers de seguridad
addEventListener('fetch', event => {
  event.respondWith(handle(event.request))
})

async function handle(request) {
  // Evitar bucle: forzamos la petición hacia el origen real
  const originHost = 'tescha.pages.dev'
  const url = new URL(request.url)
  url.hostname = originHost
  url.protocol = 'https:'

  const originRequest = new Request(url.toString(), request)
  const originResponse = await fetch(originRequest)
  const newHeaders = new Headers(originResponse.headers)

  // CSP con hashes generados (actualiza cuando recompiles si cambian)
  newHeaders.set('Content-Security-Policy', "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; style-src 'self' https://fonts.googleapis.com 'unsafe-inline'; script-src 'self' sha256-2B+ySxtR7D3fj3vb9+WAo2EBSAS8yj1CQzxZ45PYkjc= sha256-2CJ5tSRTA266mVIPVUJq4qSTqajr0oH4YDb5teq3BJk= sha256-2eVTDnOzgZegSOzUK8/+5DU5/pDIv6EmF7Wfhau7yBk= sha256-3IoUjaDGLs0AX4X95am5l6bKvMUKP34yQo+nXQL+8+o= sha256-7HRr7JFci8GNiYjox2QWOfV3y89+HyOhvjayfGtcZDs= sha256-7mu4H06fwDCjmnxxr/xNHyuQC6pLTHr4M2E4jXw5WZs= sha256-9XxjhkyockxQsgo/DxYzvK4Ix3sSMMw/K7nBV/+8xFk= sha256-CadPdaHjJHV8jgFDuq7MTKOmLcNLRfcg2N7TkBn1qXs= sha256-CHK42Vkhrwk1UbEFVemExU9hKCnOqnjRoSbMaPdkwdk= sha256-cnFDN6Ww/lRW5BaOMDqnCDF4VrOLkuaz2v1CYugvZa0= sha256-DPKQiXeRhrG7nDRQzfpRkE9OrS4GktnBAxnqNsEUwZU= sha256-DTOkn12VlheQIoayFqJ0RiWywpFI7/ro/5Ko7uf1JUE= sha256-DW3uXird7nHpdaCUrAUGp4rT4J8Zt6QaKEVtbktqKkU= sha256-ewHpWU+9FLqxwD9JkCaVX2dg9xMErPL9q5i7Qe5miow= sha256-gf+9H8LSw/8dIO+B+Xa62STFf+emz7bzV4k49aIVL6c= sha256-GFTBB91lpXkRUMXxBa0YLRsz/y7gBMHyeDPGQLoFhds= sha256-GTVwkFkJgnY0WJV2iMH0/0bd2dhl1I73/hgXV4FPyrQ= sha256-gXRhI+fKD2TdAArtun+HKKUTdxUHWumA1r5I6wrER/w= sha256-h9yEmiD3n4NGlWfLMztyErWn2h6OGLrsMS/006o2U+c= sha256-HMrdHQwuNISbz+zWgL2Mbk/V1bd0liKd1Dv2ekmdB2o= sha256-HxhGHhJBYQ+FPajUlLWCVUpaUXwhDYVqgbxvAdfgXSw= sha256-kIIp05zumDD2K9uePSLXUIh1FGkpZISrKbqkJub+X+w= sha256-KOFGddU2GlIbT/jzoqn5DmJnMMdmZbv25Xh7uqMVxJ8= sha256-l76Gn5Kzl93RNPw3k7RNQkCDUUQBWyNMA//KbChj8SM= sha256-LIbnTeK5AqUTZBxYnmpuufL3vNBni8JsEg4gUUauH98= sha256-LzglciI/X2w7QwvU5zQeJGW7gciR6cHaho0wz/oUZVA= sha256-m8DenCbGW2e+yhBpuXWJ3UuI6PnHwVJqbT3sPIXStjI= sha256-mQBuXy/vm+pB5Ul0aG5UZooIebFJNC6mCz6godERqzU= sha256-MRxGMBZJDGY1r5r9u9M2Pk5TJG9j7RWhQD8YIkp8rhw= sha256-MSV3UiL97KlE5MC6tfQ8du77SqmZMBpxPdH3W/myXf0= sha256-n8Red+pgQHA9yAdodjpdW3ZZR6KaqYX7LUvbQnYVYfs= sha256-nQtBSIGKK/WtKt6H/nWiBoISxMXVdR7cQMKpybo+KTc= sha256-OBTN3RiyCV4Bq7dFqZ5a2pAXjnCcCYeTJMO2I/LYKeo= sha256-pda18Qg2dumCeC0gs+tmyIT9FtXzxuhGrd2CkMKsCws= sha256-pgGs+fWV8tY5vNCd5oB62xk07xS+LnSoctvdWWayOSo= sha256-Ppa7VlqWjOi/+j24bxvfwW/w08MgA0XS1fJ0IorrCSM= sha256-pwV2m4eAAuabFDEG4uHesDDIWRL82r9+QrkSDFbcFKM= sha256-QAlSewaQLi/NPCznjAZSyvQ72heD0VdxmNDDkZeCxgc= sha256-QEQ+08laxHWhBEGaiNyrTvaWw+KSLZUZZmqmfyrg2zI= sha256-rxO2jsEB5Qzsng0FI+Mb5atuiLMyassbaxWGTyzvqpo= sha256-semDHgXo4BbSF5JaSY3EVhaylCUe6EgokqZbRxs06wk= sha256-sG5Cp45btuuraU0cWh0K/znOnhMy25SNlC9XBYg6tac= sha256-St+xYRdFn59WC5T2LkZyM7Hc+h4zm7rAABoUTUYOiMQ= sha256-sVuD6VI/MJy8mK9fbGWdVQ3Q5AFMq6J7gp2TSqRiH0Q= sha256-ToThkV8HUel1tr0bInFt5ROVrlBOxa4uWo6AKBf4leo= sha256-tql3hgh2M+tF8W/y19bV+UJ0CPWTjETICqSpdvNb2To= sha256-tVeGGT95Yzx9EuskwUfpAIQfW5ZModPfFTkQ6Tqi7S4= sha256-vuHH159zKwGnTiYM0n2y/KFvkxTkKB1IibgKXH4Q8K8= sha256-VYvnZ5sHSwW/AaR0otV5VXz37Oz1AYnq1UOxpSiqOEE= sha256-wjbtCl5gQsJaeTc3jXFKRPlPRQumUUqwsch5p6g2yGk= sha256-wLRWu7taY/S+G056JEWDDw1uLinauJfUR4P1Gog6RUw= sha256-WmR4J6KwWKltACtg4pJaAKwSrHnCjUINutQMZH9TV6A= sha256-wV/uc0IrvKGNbyC7WBISoP+jcbV4MvXw+7UDA/UpexI= sha256-x1yOr67+pHr+XzM88oAns//ZBASk6g3HPNmoRu6+WI= sha256-xz29JkhOEuEHVZiAuCCFk3OQ9/fJzSKjGxVhvaWHLDE= sha256-y6HyzCtEUsqNrdhiehwTjnrnA1LsXOMukejCrhOqynY= sha256-YAgabnxlu84sAk46P1bXq547x2Rdk8nmHYiR2GuTzLg= sha256-zIphIJ9b8uJ198YIS5bGjDTiFNK2MEmwiSG6f1QJChM=")

  // Otros headers recomendados
  newHeaders.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  newHeaders.set('X-Frame-Options', 'DENY')
  newHeaders.set('X-Content-Type-Options', 'nosniff')
  newHeaders.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  newHeaders.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()')
  newHeaders.set('X-XSS-Protection', '0')
  newHeaders.set('X-Robots-Tag', 'none')

  return new Response(originResponse.body, {
    status: originResponse.status,
    headers: newHeaders
  })
}
