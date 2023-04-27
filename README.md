# fs module: 

## what is a file exactly:
While the concept of a file is extremely general, **we could say that a file is a sequence of bits**. The meaning of the data in a file comes from how one chooses to interpret/decode the bits. For example, in a .txt file, a sequence of bits might represent the letter "A", but in a .png file, that same sequence of bits might represent a completely different thing, perhaps a color or a pixel.

- Inclusive your [storageDevice] is a file. => Disco duro/ Hard drive (coloquialmente)
  Todo tu hard Drive basicamente es un container de # files => hay multiples secuencias de 0 y 1 => que son files y estan almacenados en el hardDrvie.

- Inclusive your OS es una conjunction de files:

# If everything is a file, dealing with files should be extremelly important => How Nodejs does it? 
Nodejs is a server-side technology.
- *Cuando vos corres Nodejs estas corriendo un specific process en tu OS* 
- Cuestion que Nodejs se comunica con tu OS a traves de lo que se llama [systemCall]. => `hay different systemCalls` => {{ depende la func que quieras ejecutar }}
- el OS actua como una suerte de *middleman* here.

### libuv => threadPool
- Nodejs uses # threads to deal with # files.

### Letz code: 
- Create a file. you got 3 ways to do the same in Nodejs:
1. Promises API
2. callback API => grants the MAX performance of the 3.
3. Synchronous API