What is it
----------

Plugin for [exemd](http://www.vittoriozaccaria.net/exemd/) to generate
[Ascidia](https://github.com/Frimkron/Ascidia) diagrams in markdown
files.

Short help
----------

The following exemd block:

    ```{ascidia !}
                   O
                  -|-  -.
                  / \   |
                  User  | Request
                        V
     Foobar         +--------+       .------.
      Layer         |  Acme  |       '------'
    - - - - - - +   | Widget |<----->|      |
       .----.   ;   +--------+       |      |
      | do-  |  ;       |            '------'
      |  dad |--^--<|---+            Database
       '----'   ;
                ;
    ```

is converted to this picture:

![](https://dl.dropboxusercontent.com/u/5867765/tools/exemd/exemd-ascidia.png)
