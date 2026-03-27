# Clicker-Klon

Beskrivning:

I spelet så klickar man på en knapp för att få clicks som man använder för att köpa upgraderingar som ger en mer clicks, målet är att få clicks.

Hur spelet fungerar:




Teknik och lösningar:

Jag använder egentligen inte särskilt många variabler, jag använder istället "get" funktioner som returnar values baserat på mina riktiga variabler. mina enda riktiga variabler är score och properties i mina uppgraderingar.
jag lagrar variablerna högst upp i mitt js dokument.
Min klickfunktion ökar score med en mängd som är baserad på click power.
UpdateDisplay ändrar värdena i mitt stats window till deras aktuella värden i js koden.
Jag använder addeventlistener på alla html element som jag vill ska göra något när man klickar på dem, t.ex. mina uppgraderingsknappar.

Uppgraderingar:

Mina uppgraderingar är objekt i js med properties som "amount", "startingPrice" och "inflation". När man köper en uppgradering så ökar amount med 1.
Priset beräknas med formeln: price = startingprice * inflation ** amount. Priset ändras automatiskt när amount ökar.
Jag kollar om spelaren har råd genom att kolla om score>price.

Problem och lösningar:

Jag tror inte jag stötte på några större problem.

Reflektion:

jag kan inte komma på något specifikt som jag lärde mig, jag kunde redan js ganska bra.
om jag hade haft mer tid så hade jag nog lagt till fler funktioner t.ex. något som motsvarar Cookie Clicker's "ascension"
