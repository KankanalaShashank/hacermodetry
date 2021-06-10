function startagain() {
    function reloadingpage() {
        window.location.reload()
    }

    let startthegamebutton = document.getElementById("startgame")
    document.body.removeChild(startthegamebutton)
    let reloadbuttoncont = document.getElementById("reloadcontainer")
    let reloadbutton = document.createElement("button")
    reloadbutton.textContent = "REPLAY"
    reloadbutton.classList.add("buttonstyles")



    reloadbutton.addEventListener("click", reloadingpage)


    let colorlist = ["orange", "red", "yellow", "blue", "pink", "grey"]
    let counterelement = document.getElementById("countertime")
    let countercount = 0
    let uniqueid = null
    let numberofmoves = 1
    let stepmoveview = document.getElementById("numbermoves")
    let playgridback = document.getElementById("playgrid")
    playgridback.style.backgroundColor = "#94ebd6"

    let givengrid = document.getElementById("grid")
    givengrid.style.backgroundColor = "#94ebd6"






    function updatecount() {
        numberofmoves = numberofmoves + 1
        stepmoveview.textContent = "NUMBER OF MOVES : " + numberofmoves
        //console.log(numberofmoves)
    }

    function finalmoves() {
        let finalmovess = stepmoveview.textContent
        return finalmovess
    }





    uniqueid = setInterval(function() {
        counterelement.textContent = "Time : " + countercount + " sec"
        countercount = countercount + 1
    }, 1000)


    let answerelement = document.getElementById("answer")


    let playgrid = [{
            Tileno: "Tile10"
        },
        {
            Tileno: "Tile11"
        }, {
            Tileno: "Tile12"
        }, {
            Tileno: "Tile13"
        }, {
            Tileno: "Tile14"
        }, {
            Tileno: "Tile15"
        }, {
            Tileno: "Tile16"
        }, {
            Tileno: "Tile17"
        }, {
            Tileno: "Tile18"
        }, {
            Tileno: "Tile19"
        }, {
            Tileno: "Tile20"
        }, {
            Tileno: "Tile21"
        }, {
            Tileno: "Tile22"
        }, {
            Tileno: "Tile23"
        }, {
            Tileno: "Tile24"
        }
    ]
    let counter = 0

    function changestyles(tiles) {
        let idvalue = tiles.tileno
        let Tidvalue = tiles.Tileno
        let buttonelement = document.getElementById(idvalue)
        let buttontelement = document.getElementById(Tidvalue)
        buttonelement.style.backgroundColor = randomcolors[counter]
        buttontelement.style.backgroundColor = randomcolors[counter]
        counter = counter + 1

    }
    let secondcounter = 0

    function modifystyles(Tiles) {
        let nidvalue = Tiles.Tileno
        let buttonTelement = document.getElementById(nidvalue)
        buttonTelement.style.backgroundColor = randomnewcolors[secondcounter]
        secondcounter = secondcounter + 1
    }

    function getfrom() {
        let storeddata = localStorage.getItem("users")
        let parseddata = JSON.parse(storeddata)
        if (parseddata === null) {
            return []
        } else {
            return parseddata
        }
    }

    let userdetails = getfrom()

    function storagesection() {
        let username = document.getElementById("userdetails");
        let userpre = username.value;

        let usersub = {
            "name": userpre,
            "moves": finalmoves()
        }
        userdetails.push(usersub)
        let stringifieddata = JSON.stringify(userdetails);
        localStorage.setItem("users", stringifieddata);
    }

    let grid = [{
            tileno: "tile1",
            Tileno: "Tile1"
        },
        {
            tileno: "tile2",
            Tileno: "Tile2"
        },
        {
            tileno: "tile3",
            Tileno: "Tile3"
        },
        {
            tileno: "tile4",
            Tileno: "Tile4"
        }, {
            tileno: "tile5",
            Tileno: "Tile5"
        }, {
            tileno: "tile6",
            Tileno: "Tile6"
        }, {
            tileno: "tile7",
            Tileno: "Tile7"
        }, {
            tileno: "tile8",
            Tileno: "Tile8"
        }, {
            tileno: "tile9",
            Tileno: "Tile9"
        }
    ]

    let randomcolors = [];
    let randomnewcolors = [];
    for (let tiles of grid) {
        randomcolors.push(colorlist[Math.floor(Math.random() * colorlist.length)])
    }
    for (let Tiles of playgrid) {
        randomnewcolors.push(colorlist[Math.floor(Math.random() * colorlist.length)])
    }

    randomnewcolors.push("white")

    for (let tiles of grid) {
        changestyles(tiles)
    }
    for (let Tiles of playgrid) {
        modifystyles(Tiles)
    }



    if (Boolean(check())) {
        document.getElementById("answer").innerText = "You Win!!!";
        clearInterval(uniqueid)
        let reloadbutton = document.createElement("button")
        reloadbuttoncont.appendChild(reloadbutton)
        storagesection()
        displayscoreboard();

    }

    document.getElementById("playgrid").addEventListener("click", function(event) {
        let id = event.target.id;

        if (document.getElementById(id).style.backgroundColor !== "white") {
            let number = parseInt(id.substring(4, id.length));
            swap(number);
            if (Boolean(check())) {
                document.getElementById("answer").innerText = "You win!!!";
                clearInterval(uniqueid);
                reloadbuttoncont.appendChild(reloadbutton)
                storagesection()
                displayscoreboard();
            }
        }

    })

    function styleandappend(players) {
        let scoredisplaysection = document.getElementById("scoredisplay")
        scoredisplaysection.classList.add("scoreboardstyle")
        let paraitem = document.createElement("p")
        let displaytext = players["name"] + ":" + "    " + players["moves"]
        console.log(displaytext)
        paraitem.textContent = displaytext
        scoredisplaysection.appendChild(paraitem)
    }

    function displayscoreboard() {
        let storeddata = localStorage.getItem("users")
        let parseddata = JSON.parse(storeddata)
        let socreboardname = document.createElement("h")
        let scoredisplaysection = document.getElementById("scoredisplay")
        socreboardname.textContent = "SCOREBOARD"
        scoredisplaysection.appendChild(socreboardname)
        for (let players of parseddata) {
            styleandappend(players)
        }
    }


    function swap(num) {
        var flag = false;
        var vis = false;
        if (num == 5) {
            vis = true;
            if (document.getElementById("Tile" + (num - 1)).style.backgroundColor === "white") {
                document.getElementById("Tile" + (num - 1)).style.backgroundColor = document.getElementById("Tile" + num).style.backgroundColor;
                flag = true;

            } else if (document.getElementById("Tile" + (num + 5)).style.backgroundColor == "white") {
                document.getElementById("Tile" + (num + 5)).style.backgroundColor = document.getElementById("Tile" + num).style.backgroundColor;
                flag = true;

            }
        }
        if (num == 25) {
            vis = true;
            if (document.getElementById("Tile" + (num - 1)).style.backgroundColor === "white") {
                document.getElementById("Tile" + (num - 1)).style.backgroundColor = document.getElementById("Tile" + num).style.backgroundColor;
                flag = true;

            } else if (document.getElementById("Tile" + (num - 5)).style.backgroundColor == "white") {
                document.getElementById("Tile" + (num - 5)).style.backgroundColor = document.getElementById("Tile" + num).style.backgroundColor;
                flag = true;

            }
        }
        if (num == 21) {
            vis = true;
            if (document.getElementById("Tile" + (num + 1)).style.backgroundColor === "white") {
                document.getElementById("Tile" + (num + 1)).style.backgroundColor = document.getElementById("Tile" + num).style.backgroundColor;
                flag = true;

            } else if (document.getElementById("Tile" + (num - 5)).style.backgroundColor == "white") {
                document.getElementById("Tile" + (num - 5)).style.backgroundColor = document.getElementById("Tile" + num).style.backgroundColor;
                flag = true;

            }
        }
        if (num == 1) {
            vis = true;
            if (document.getElementById("Tile" + (num + 1)).style.backgroundColor === "white") {
                document.getElementById("Tile" + (num + 1)).style.backgroundColor = document.getElementById("Tile" + num).style.backgroundColor;
                flag = true;

            } else if (document.getElementById("Tile" + (num + 5)).style.backgroundColor == "white") {
                document.getElementById("Tile" + (num + 5)).style.backgroundColor = document.getElementById("Tile" + num).style.backgroundColor;
                flag = true;

            }
        }

        if (Boolean(vis)) {
            if (Boolean(flag)) {
                document.getElementById("Tile" + num).style.backgroundColor = "white";

            }
            return;
        }


        if (num < 5 || num > 21) {
            if (document.getElementById("Tile" + (num + 1)).style.backgroundColor === "white") {

                document.getElementById("Tile" + (num + 1)).style.backgroundColor = document.getElementById("Tile" + num).style.backgroundColor;
                flag = true;

            }
            if (document.getElementById("Tile" + (num - 1)).style.backgroundColor === "white") {
                document.getElementById("Tile" + (num - 1)).style.backgroundColor = document.getElementById("Tile" + num).style.backgroundColor;
                flag = true;

            }
            if (num < 5) {
                if (document.getElementById("Tile" + (num + 5)).style.backgroundColor === "white") {
                    document.getElementById("Tile" + (num + 5)).style.backgroundColor = document.getElementById("Tile" + num).style.backgroundColor;
                    flag = true;

                }
            }
            if (num > 21) {
                if (document.getElementById("Tile" + (num - 5)).style.backgroundColor === "white") {
                    document.getElementById("Tile" + (num - 5)).style.backgroundColor = document.getElementById("Tile" + num).style.backgroundColor;
                    flag = true;

                }
            }
        } else if (num % 5 === 0 || num % 5 === 1) {
            if (document.getElementById("Tile" + (num + 5)).style.backgroundColor === "white") {
                document.getElementById("Tile" + (num + 5)).style.backgroundColor = document.getElementById("Tile" + num).style.backgroundColor;
                flag = true;

            }
            if (document.getElementById("Tile" + (num - 5)).style.backgroundColor === "white") {
                document.getElementById("Tile" + (num - 5)).style.backgroundColor = document.getElementById("Tile" + num).style.backgroundColor;
                flag = true;

            }
            if (num % 5 === 0) {
                if (document.getElementById("Tile" + (num - 1)).style.backgroundColor === "white") {
                    document.getElementById("Tile" + (num - 1)).style.backgroundColor = document.getElementById("Tile" + num).style.backgroundColor;
                    flag = true;

                }
            }
            if (num % 5 === 1) {
                if (document.getElementById("Tile" + (num + 1)).style.backgroundColor === "white") {
                    document.getElementById("Tile" + (num + 1)).style.backgroundColor = document.getElementById("Tile" + num).style.backgroundColor;
                    flag = true;

                }
            }

        } else {
            if (document.getElementById("Tile" + (num + 1)).style.backgroundColor === "white") {
                document.getElementById("Tile" + (num + 1)).style.backgroundColor = document.getElementById("Tile" + num).style.backgroundColor;
                flag = true;

            }
            if (document.getElementById("Tile" + (num - 1)).style.backgroundColor === "white") {
                document.getElementById("Tile" + (num - 1)).style.backgroundColor = document.getElementById("Tile" + num).style.backgroundColor;
                flag = true;

            }
            if (document.getElementById("Tile" + (num + 5)).style.backgroundColor === "white") {
                document.getElementById("Tile" + (num + 5)).style.backgroundColor = document.getElementById("Tile" + num).style.backgroundColor;
                flag = true;

            }
            if (document.getElementById("Tile" + (num - 5)).style.backgroundColor === "white") {
                document.getElementById("Tile" + (num - 5)).style.backgroundColor = document.getElementById("Tile" + num).style.backgroundColor;
                flag = true;

            }
        }

        if (Boolean(flag)) {
            document.getElementById("Tile" + num).style.backgroundColor = "white";
            updatecount();

            return;
        }

    }



    function check() {
        let arr = [2, 3, 4];
        let c = 1;
        for (let i = 1; i <= 3; i++) {
            for (let j = 0; j < arr.length; j++) {
                let num = 5 * i + arr[j];
                let firstbackgroundColor = document.getElementById("Tile" + num).style.backgroundColor;
                let secondbackgroundColor = document.getElementById("tile" + c).style.backgroundColor;
                c++;
                if (firstbackgroundColor !== secondbackgroundColor) return false;
            }
        }
        return true;
    }


}