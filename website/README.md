# Vektoreneinbettung

Durch die Vektoreneinbettung teilt man einem LLM die Bedeutung eines Wortes mit. Worte haben in der Regel eigentlich keine Bedeutung. Es ist nur eine Aneinanderreihung von Buchstaben, welchen wir als Menschen dann die Bedeutung geben. Selbst wir müssen die Bedeutung dieser Wörter zuerst mal lernen.  

Maschinen sprechen nicht in Wörtern, sondern in Zahlen - Einsen und Nullen. Wie können wir komplexe Bedeutungen in Zahlen festhalten? LLMs lösen dieses Problme ..... Durch hochdimensionale Vektoren, in denen Attribute des Wortes als Richtungen enthalten sind.

Ein gutes Beispiel dazu ist wie Computer mit RGB Farben umgehen. 

Beispiel: Festhaltung von RGB-Werten in einem dreidimensionalen Vektor. 

Wir haben 3 Dimensionen, drei «Richtungen». Rot, grün und blau. Entlang dieser Richtungen wird festgehalten, Wie viel einer Farbe an einem Punkt ist sagen die Vektoren eigentlich aus, wie rot, blau oder grün eine einzelne Farbe ist. 

Beispiele (Disclaimer: RGB-Mischung funktioniert anders als klassische, echte Farbmischung): 

**Input fields mit Vektoren unter wechselnden Farben** 

Kein rot + kein grün + kein blau (0, 0, 0) = schwarzer Punkt 

Voll rot + kein grün + kein blau (255, 0, 0) = roter Punkt 

Voll rot + kein grün + voll blau (255, 0, 255) = pinker Punkt 

Voll rot + voll grün + kein blau (255, 255, 0) = gelber Punkt 

Voll rot + voll grün + voll blau (255, 255, 255) = weisser Punkt 

Anschliessend Web-Einbettung in der man selbst damit herumspielen kann. 

> RGB Cube - OpenProcessing 

 

Der Computer arbeitet anschliessend mit der Position der Farbe. Er weiss nicht, was Grün bedeutet, doch er weiss, dass sich grün auf der Grünheitsskala am höchsten Punkt befindet, also auf dem Vektor (0, 255, 0) abbildet. So kann er dann Grün darstellen. Pink beschreibt dann die Beziehung zwischen der blauen und der roten Dimension, (255, 0, 255).  

Eine LLM übersetzt Wörter in hochdimensionalen Vektoren. Um zu wissen, was «Königin» bedeutet, sucht ein LLM Vektoren, die in eine ähnliche Richtung zeigen. Hier würde zum Beispiel König aufkommen.  

> Flugzeug Beispiel 

> Ungefähr 2’000-10’000 Dimensionen 

 

> Prozess 
