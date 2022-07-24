"use strict"
/**
 * My First Game in JavaScript
 * 
 * @author ToniSun 
 */



let squareNumb = 9



function num() {
    if( $('#easyBTN').attr('class') === 'selected'){
        squareNumb = 3
    }
    if( $('#normalBTN').attr('class') === 'selected'){
        squareNumb = 6
    }
    if( $('#hardBTN').attr('class') === 'selected'){
        squareNumb = 12
    }

    return squareNumb
}
num()



/**
 * Game Buttons
 */
$('#reset').on('click', function () {
    $('.square').remove()
    app()
})
$('#easyBTN').on('click', function () {
    $(this).addClass('selected')
    $('#normalBTN').removeClass('selected')
    $('#hardBTN').removeClass('selected')
    $('.square').remove()
    app()
})
$('#normalBTN').on('click', function () {
    $(this).addClass('selected')
    $('#easyBTN').removeClass('selected')
    $('#hardBTN').removeClass('selected')
    $('.square').remove()
    app()
})
$('#hardBTN').on('click', function () {
    $(this).addClass('selected')
    $('#normalBTN').removeClass('selected')
    $('#easyBTN').removeClass('selected')
    $('.square').remove()
    app()
})



/**
 * 
 */
function app() {

    let count = 0
    while (count < num()) {
        $('.items').append('<div class="square"></div>')
        count++
    }

    let square = $('.square')

    let rootColors = $('i')

    let colors = colorArray(num())

    let pickedColor = pickColor();

    let objRGB



    /**
     * 
     * @returns 
     */
    function randomColors () {
        let r = Math.floor(Math.random() * 255) + 1
        let g = Math.floor(Math.random() * 255) + 1
        let b = Math.floor(Math.random() * 255) + 1

        return 'rgb('+ r +', '+ g +', '+ b +')'
    }



    /**
     * 
     * @param {*} num 
     */
    function colorArray (numSquares) {
        let colors = []

        for ( let color = 0; color < numSquares; color++)
            colors.push(randomColors())

        return colors
    }



    /**
     * 
     */
    function pickColor () {
        let pickColor = Math.floor( Math.random() * colors.length)
        return colors[pickColor]
    }



    function maingame () {
        $('#rgbCode').text(pickedColor)
        setRootColors(pickedColor)
        for ( let element = 0; element < num(); element++) {
            square[element].style.backgroundColor = colors[element]

            $(square[element]).on('click', function () {

                if ( square[element].style.backgroundColor === pickedColor) {
                    $('.square').off('click')
                    $('#rgbCode').fadeOut('slow').fadeIn('fast').text('correctly')
                    $('#gameheader').css({backgroundColor: pickedColor})
                    timeout()
                } else {
                    $(this).css({ backgroundColor: '#232323'})
                }
            })
        }
    }



    /**
     * RGB or RGBA to json object 
     * 
     * @param {*} string rgb | rgba like 'rgb(255, 45, 23)' | rgba(255, 99, 71, 0.5)
     * @returns object like 
     * {
     *  blue: "71",
     *  green: "99",
     *  red: "255"
     * }
     * 
     * {
     *  alpha: "0.5",
     *  blue: "71",
     *  green: "99",
     *  red: "255"
     * }
     */
    function rgbToObj(rgb) {
        let colors = ["red", "green", "blue", "alpha"]
    
        let colorArr = rgb.slice(
            rgb.indexOf("(") + 1, 
            rgb.indexOf(")")
        ).split(", ");
    
        let obj = new Object();
    
        colorArr.forEach((k, i) => {
            obj[colors[i]] = k
        })
    
        return obj;
    }



    /**
     * 
     * @param {*} pickedColor 
     */
    function setRootColors(pickedColor) {
        objRGB = rgbToObj(pickedColor)
        // console.log(rootColors.length)
        for (let i = 0; i < rootColors.length; i++) {
            if ( i == 0 ) {
                rootColors[i].style.backgroundColor = 'rgb(' + objRGB['red'] + ', 0, 0)'
                $('.circle-red').css('background-color', 'rgb(' + objRGB['red'] + ', 0, 0)' )
                // console.log('rgb(' + objRGB['red'] + ', 255, 255)')
            } 
            if ( i == 1 ) {
                rootColors[i].style.backgroundColor = 'rgb(0, ' + objRGB['green'] + ', 0)'
                $('.circle-green').css('background-color', 'rgb(0, ' + objRGB['green'] + ', 0)')
                // console.log('rgb(255, ' + objRGB['green'] + ', 255)')
            }
            if ( i == 2 ) {
                rootColors[i].style.backgroundColor = 'rgb(0, 0, ' + objRGB['blue'] + ')'
                $('.circle-blue').css('background-color', 'rgb(0, 0, ' + objRGB['blue'] + ')')
                // console.log('rgb(255, 255,' + objRGB['blue'] + ')')
            }
        }
    }



    /**
     * 
     */
    function reset () {
        colors = colorArray(num())
        pickedColor = pickColor()
        setRootColors(pickedColor)
        $('#rgbCode').text(pickedColor)
        $('#gameheader').css({ backgroundColor: '#232323'})
        maingame()
    }



    /**
     * 
     */
    function timeout () {
        setTimeout( function () {
            reset()
        }, 3000)
    }



    maingame()
}
app()




