# MLP

> Erkläri hie ou Neurali Netzwerk - wöu schlussendlich isch MLP ja eis u i gseh noni wo das ds süsch erklärt wird --> oder lömers eifach us wüus nid direkt direkt brucht wird fürs verständnis was ä AI hie macht?  

> Erklärung was das MLP macht im Kontext des Transformers 

> Erklärung was es ist? 

## Ein Durchlauf des MLP 

Das MLP ist ein Neurales Netzwerk, welches dem LLM ermöglicht Informationen zu speichern und ergänzen. Ein Anschauliches Beispiel ist, wenn man ein ChatBot fragt, wie viel Personen in ein A irbus A320 passen. Solange das LLM keinen Zugriff aufs Internet hat, muss die Sitzplatzanzahl irgendwo innerhalb des Models gespeichert sein. Genau diesen Schritt übernimmt das MLP. Damit wir den Ablauf genauer verstehen, schauen wir uns einen Durchlauf durchs MLP schrittweise genau an. In realen zuständen werden mehrere Durchläufe parallel zueinander ausgeführt, um noch schnellere und präzisere Antworten geben zu können.   

### Input ins MLP 

Nach der Attention haben wir mehrere Vektoren erhalten, welche von anderen Tokens beeinflusst wurden. Da in der MLP-Schicht alle Vektoren parallel und isoliert voneinander bearbeitet werden, werden wir zur Vereinfachung einen Vektor, welcher den Airbus A320 widerspiegelt, anschauen. 

### Name für 1. Step 

Als erster Schritt innerhalb des MLPs wird der Vektor aus der Attention mit einer Matrix multipliziert. Bei der Matrix handelt es sich um viele Modelparameter, die, während des Lernens der LLM, angepasst werden. Innerhalb der Matrix betrachten wir nun eine Zeile als einen weiteren Vektor. Bei der Matrixmultiplikation erhalten wir somit das Skalarprodukt der beiden Vektoren.  

> FRAGENVEKTOR ERKLAEREN UND SKALARPRODUKT 

Falls dieses ungefähr eins beträgt, heisst dies, dass die Vektoren fast identisch zueinander sind. Ein Betrag näher zu Null oder im Minusbereich bedeutet, dass die Vektoren keine Übereinstimmung haben. Diese Funktion ermöglicht die Fähigkeit, Fragen zu dem Vektor, welchen wir aus der Attention erhalten haben, zu stellen.  

> Grafik müsst no schön si ... + gezielti Frag Airbus 320 + Vektore statt komischi Viereck 

Innerhalb von realen LLM sind die Fragenvektoren deutlich komplexer und beinhalten mehrere Kombinationen aus Eigenschaften. Zum Beispiel könnte der Fragenvektor die Addition der beiden Vektoren «Kann fliegen» und «Ist ein Flugzeug» sein. Dies ermöglicht es, mit einem Skalarprodukt bereits mehrere Eigenschaften abzufragen. Ausserdem wird zu den jeweiligen Skalarprodukten noch ein weiterer Vektor addiert. Dieser wird Bias genannt, besteht aus weiteren Modelparamter und ermöglicht es bei komplexeren Fragenvektoren, das Skalarprodukt anzupassen, um eine bessere Wahr- oder Falschaussage im nächsten Schritt zu treffen. 

Nach dem Abschliessen dieser linearen Funktion erhalten wir einen Vektor, welcher den Airbus A320 in einem Raum widerspiegelt, welcher ein Mehrfaches an Dimensionen hat, im Vergleich zum ursprünglichen Vektorraum. Jede Dimension entspricht dabei dem Ergebnis einer gefragten Frage, wobei der Wert widerspiegelt, wie fest die Frage auf den Vektor, aus der Attention, stimmt. 

### Name für 2. Step 

Der erste Schritt innerhalb des MLP ergibt uns einen Vektor mit Zahlen, welche aussagen, wie fest eine Frage mit dem ursprünglichen Vektor aus der Attention übereinstimmt. Um zu definieren, wann eine Frage zutrifft, und wann diese nicht zutrifft, wird eine nicht lineare Funktion verwendet. Diese Funktion ist unterschiedlich je nach LLM. Während unserer Arbeit schauen wir uns die ReLU Funktion genauer an.  

> BILD: ReLU 

Die ReLU-Funktion ergibt für alle Werte welche kleiner oder gleich null sind null. Bei positiven Zahlen gibt die ReLU-Funktion die positive Zahl, ohne Veränderung, wieder zurück. Nach der Ausführung der ReLU-Funktion kann abgelesen werden, welche Fragen zutreffen und welche nicht. Sämtliche Werte, welche grösser als null sind, treffen zu. Alle, die gleich null sind, treffen nicht zu. Um dies in den Kontext des neuronalen Netzwerkes zu bringen: Sobald eine Frage zutrifft, ist dieses Neuron aktiv und bei negativen Zahlen inaktiv. 

Bei dieser Funktion kommt nun wieder der Bias ins Spiel. Falls der Fragenvektor die Addition der beiden Vektoren «Kann fliegen» und «Ist ein Flugzeug» bekommt man bereits einen positiven Wert, wenn nur einer der beiden Fragen stimmt. Mit dem Bias gibt es die Möglichkeit, im Nachhinein das Skalarprodukt noch anzupassen und zum Beispiel minus 1.9 rechnen. Da ein Skalarprodukt von zwei Vektoren maximal eins ergibt, wenn diese genau übereinstimmen, würde dieser Bias bewirken, dass unser Vektor aus der Attention extrem stark, mit den beiden Eigenschaften übereinstimmen muss. 

> BILD: Beispiel Rechnung 

### Name für 3. Step  

Aus der ReLU-Funktion erhalten wir einen Vektor mit Zahlen von null bis unendlich. Der nächste Schritt innerhalb des MLP ist erneut eine Matrixmultiplikation wie im ersten Schritt. Bei dieser Multiplikation ist es am besten, wenn man sich die Matrix spaltenweise vorstellt. Jede Spalte hat genau die Grösse des ursprünglichen Vektorraums und widerspiegelt darin eine bestimmte Information. In unserem Beispiel gäbe es innerhalb der Matrix zum Beispiel eine Spalte, welche die 150-187 Sitzplätze innerhalb des ursprünglichen Vektorraums widerspiegelt. Falls das Skalarprodukt der Frage, ob es sich um einen Airbus A320 handelt, positiv ist, wird die ReLU Funktion den Wert nicht anpassen und bei dieser Matrixmultiplikation wird der Vektor der Sitzplätze beim Endergebnis mit einbezogen. Solange die ReLU-Funktion für eine Frage Null zurückgibt, wird diese Spalte nicht zum Endergebnis dazugerechnet.  

> BILD: Beispiel Multiplikation --> mit Airbus A320 Sitzplätze spalte aber auch mit einer Spalte, welche Federn ergänzen würde (Vogel Beispiel) 

In realen LLMs gibt es keine Spalte, welche direkt einen Fakt widerspiegelt, eine Spalte enthält meist eine Addition von verschiedenen Fakten. In unserem Beispiel könnte die Spalte also die Sitzplätze, Triebwerkanzahl und vieles mehr des Airbusses A320 enthalten. Ausserdem werden sämtliche Spalten von zutreffenden Fragenvektoren zusammenaddiert. Dadurch kann es auch sein, dass ein Fakt überhaupt nicht innerhalb einer Spalte in der Metrik liegt, sondern erst durch die Kombination von verschiedenen Spalten beim Endergebnis dabei ist. 

Am Ende dieses Schrittes haben wir wieder einen Vektor, welcher die Grösse des ursprünglichen Vektorenraums hat, und sämtliche zusätzlichen Informationen verglichen mit dem Vektor aus der Attention enthält. 

### Name für 4. Step 

Damit der ursprüngliche Vektor aus der Attention beim Weiteren verarbeiten nicht komplett vergessen wird, addiert der letzte Schritt des MLP den Vektor aus der Attention mit dem Vektor, welcher die zusätzlichen Fakten enthält.  

> BILD: Vektor Addition 

In unserem Beispiel hätten wir nun einen Vektor, welcher Airbus, A320 und nun auch die 150-187 Sitzplätze beinhaltet. 
