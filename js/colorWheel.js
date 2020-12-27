/*
    --- colorWheel ------------------------------
        JS (colorWheel.js) Version 0.63 (2020)
        internal CSS       Version 0.57 (2020)
        from Marc-Andre Trage mt@7vm.de
    ---------------------------------------------
*/
var colorWheelDiameter = 256,
    colorBarWidth      = 808,
    colorBarHeight     = 32,
    canvasError        = "Your browser does not support the HTML5 canvas tag.",
// --- colorWheel & colorBar ------------------------------------------------------------------------------------------
    sX = 0,   // 133
    sY = 0,   // 133
     g = 60,  // 1-60°*6
     s = 0,   // colorWheel central starting point radius
     r = 128, // colorWheel radius
     x = 128, // colorWheel X position
     y = 128, // colorWheel Y position
     α = 100, // preview color alpha start value in %
     f = 1,   // alpha value head preview color
     t = 4,   /* 1-60 degree of accuracy of the color cuts in the color wheel between the degree numbers
                 1 stands for the most precise calculation, and 10, for example, for a 10-fold larger colour step
                 attention the smaller this value is the more you have to calculate for the colorWheels */
    vB = 2,   // 0-10 colorWheel 1 to 3 can be used with a blur filter to smooth the color transitions afterwards
    bR = 0,   // colorBar first start value
    bN = 0,   // colorButton count number
    bS,       // stored the selected colorButton NUMBER
     m;       // !!! do not change !!! "true/false"-switch for activate colorWheelSetCC function

// BEG Image files (64Base) -------------------------------------------------------------------------------------------
// Classic background image for the display of transparent colours, such as those used in GIMP or Photoshop.
var TB = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TRS0VBzuIOGSoThZERcRJq1CECqFWaNXB5NIvaNKQpLg4Cq4FBz8Wqw4uzro6uAqC4AeIk6OToouU+L+k0CLGg+N+vLv3uHsHCPUy06yOMUDTbTOViIuZ7KrY9YogQoigBzMys4w5SUrCd3zdI8DXuxjP8j/35+hVcxYDAiLxLDNMm3iDeGrTNjjvE0dYUVaJz4lHTbog8SPXFY/fOBdcFnhmxEyn5okjxGKhjZU2ZkVTI54kjqqaTvlCxmOV8xZnrVxlzXvyF4Zz+soy12kOIYFFLEGCCAVVlFCGjRitOikWUrQf9/EPun6JXAq5SmDkWEAFGmTXD/4Hv7u18hPjXlI4DnS+OM7HMNC1CzRqjvN97DiNEyD4DFzpLX+lDkx/kl5radEjoG8buLhuacoecLkDDDwZsim7UpCmkM8D72f0TVmg/xYIrXm9Nfdx+gCkqavkDXBwCIwUKHvd593d7b39e6bZ3w9jqXKhzVt+oAAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QDCxAHEJ9wKzYAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAMElEQVQ4y2NMTU39z0AEUFdXJ0YZAxMDlcGogaMGDgYDWYjNATdv3hwNw1EDR66BADT2Bc3mwSScAAAAAElFTkSuQmCC',
// 3 different arrows, AS = Standard, AT = Top and AB = Bottom
    AS = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAuCAQAAABpVkpOAAABJGlDQ1BJQ0MgcHJvZmlsZQAAKJGdkL9Kw1AUxn9pREV0EP8g4pDBteBiJ5eqEAoKMVawOqVJisUkhiSl+Aa+iT5MB0HwCXwCBWe/Gx0czOKFw/fjcM733Xuh5SRhWs7tQZpVhet3B5eDK2fhDZstVtnADsIy73reCY3n8xXL6EvbeDXP/Xnmo7gMpTNVFuZFBdaBuDOtcsMq1m/7/pH4QexEaRaJn8S7URoZNrt+mkzCH09zm+U4uzg3fdUOLj1O8XAYMmFMQkVbmqlzTId9qUtBwD0loTQhVm+qmYobUSknl0NRX6TbNORt13meUobyGMvLJNyRytPkYf73e+3jrN60Nmd5UAR1y1a1RiN4f4SVAaw9w9J1Q9bi77c1zHTqmX++8QuvD1BIFfnfDwAAAAJiS0dEAACqjSMyAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH5AMYESIQNO1plwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAADFSURBVEjH7dExrgFRFIDhn0ZkWoklKGxCpdDYg2LWoZBYhSgkFmABKitQKUT7JMRpVf5XPAUywyhfcv/T3Xw5xbmQSqVSqX9drfi5XsJH3+xucaJVnS8yWVTFPW4zudGrghvsBv44kB2Nz3yCG8ONyOQT7nAdG4bhWK503l973fVw5we7si77AYAcV3cchiuRvAy3ueSeH/jZXC60i/kyc/uAw3BrJssi3Mf5Cw7DuUj/FTfZDz0W8KND2dN85lN8O9M/9gu/FKZIMefyKwAAAABJRU5ErkJggg==',
    AT = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAATCAQAAADRsl49AAABI2lDQ1BJQ0MgcHJvZmlsZQAAKJGdkLFKw1AUhr+0okV0UjqIQwQdCy5mcqkKQVCIsYLVKU1SLCYxJCnFN/BN9GE6CIJP4BMoOPvf6OBgFi8c/o/DOf9/74WWnYRpubALaVYVrt8fXg6v7KU32nTpsMNWEJZ53/NOaDyfr1hGX3rGq3nuz7MYxWUonauyMC8qsPbFzqzKDatYvx34h+IHsR2lWSR+Em9HaWTY7PppMg1/PM1tVuLs4tz0VZu4HHOKh82IKRMSKnrSTJ0jHPakLgUB95SE0oRYvZlmKm5EpZxcDkQDkW7TkLdR53lKGcljIi+TcEcqT5OH+d/vtY+zetPqzvOgCOpWW9Uaj+H9EVaHsPYMy9cNWZ3fb2uYceqZf77xC/SWUGtMgIl0AAAAAmJLR0QA75o43NsAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfkAxgAMh0des48AAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAAQ1JREFUKM+NkzFqAkEYRt+uhci2glZpLay8QLCyMIVNzrA2FoFcwEKQHCJYCFapPICkcLdII1hZiNhFiI4QQhCE/dIIGpkdd6ab//Fm5p9vPF54JOt4gzKmo532zrlTRxjKOX74/ni4586pjXmCZ94BfKKa1g73WjUR4YMPJLRnx5HDPWJ2pE1yXumjOMUdC9H/LyiwbGljgTdqiSWF6x0baGDBB0I0rEcMNL+C5wpEyrVKmFDbC3irUBhKaS0I0fgCHwsRpnfMY1LV6gSvVBUTPNfzVTh0T3hXHKjcilEPTbXXVIje7dTlWTT1qaZYkM8S0zrJq0ioZ831MBDDzL+AIl8UbYWcFf/FENkKf5M5CdYENY2vAAAAAElFTkSuQmCC',
    AB = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAATCAQAAADRsl49AAABI2lDQ1BJQ0MgcHJvZmlsZQAAKJGdkLFKw1AUhr+0okV0UjqIQwQdCy5mcqkKQVCIsYLVKU1SLCYxJCnFN/BN9GE6CIJP4BMoOPvf6OBgFi8c/o/DOf9/74WWnYRpubALaVYVrt8fXg6v7KU32nTpsMNWEJZ53/NOaDyfr1hGX3rGq3nuz7MYxWUonauyMC8qsPbFzqzKDatYvx34h+IHsR2lWSR+Em9HaWTY7PppMg1/PM1tVuLs4tz0VZu4HHOKh82IKRMSKnrSTJ0jHPakLgUB95SE0oRYvZlmKm5EpZxcDkQDkW7TkLdR53lKGcljIi+TcEcqT5OH+d/vtY+zetPqzvOgCOpWW9Uaj+H9EVaHsPYMy9cNWZ3fb2uYceqZf77xC/SWUGtMgIl0AAAAAmJLR0QA75o43NsAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfkAxgAMwhpvBuWAAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAARdJREFUKM+V0zFLgnEQx/GvPomJWwg61FY8gy6uTU4ODrk0CU3Bg0MvQkiEXoKQPITgFA3uOTlFk5ODuGYk/rcQB38NPpHI38enu+34cHdwHNjjln9Ehi8y0Xk3LbpRcYl1R6wpRcFJxhV9qCLGJA/zJhrKaChE8xB2WTZkZGTUEEvcMBxjkNc04FPlxYDYfu6hfoCNjPpCePtwloWn+RafyxMLsnbeS2u0hY2MRkqLng2Xkb+DjYx8Icq7OMWkqpmFz1QVE1Ib5gT8niufnGXoES6dExxe/2oFVi1L599siRUFgDgQp11M1ELOUaOYoE18s0yd+iMXIfyYc3pnfPLukOPlLnUTdjzglG/eLnmK8cB15D94/gEjlsRFHpPGcgAAAABJRU5ErkJggg==',
// colorPicker Cursor DATA
    CP = 'data:image/png;base64,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az0iWE1QIENvcmUgNC40LjAtRXhpdjIiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6aXB0Y0V4dD0iaHR0cDovL2lwdGMub3JnL3N0ZC9JcHRjNHhtcEV4dC8yMDA4LTAyLTI5LyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgIHhtbG5zOnBsdXM9Imh0dHA6Ly9ucy51c2VwbHVzLm9yZy9sZGYveG1wLzEuMC8iCiAgICB4bWxuczpHSU1QPSJodHRwOi8vd3d3LmdpbXAub3JnL3htcC8iCiAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgeG1wTU06RG9jdW1lbnRJRD0iZ2ltcDpkb2NpZDpnaW1wOjY0MGViNDk3LWU2NDktNGZjNC05YmU3LTEwMWE5YTY0YzNmMSIKICAgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0MjA0ODMxNS0yNjMxLTQwNTUtODRhOS1kYjExYThhODRjNTUiCiAgIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyNmM3YmQwNi1kOTlkLTQ1MjQtYjA1MS1iOWUyZjZkY2MyMWYiCiAgIEdJTVA6QVBJPSIyLjAiCiAgIEdJTVA6UGxhdGZvcm09IkxpbnV4IgogICBHSU1QOlRpbWVTdGFtcD0iMTYwODc1MDcwNDc5ODQyNiIKICAgR0lNUDpWZXJzaW9uPSIyLjEwLjIyIgogICBkYzpGb3JtYXQ9ImltYWdlL3BuZyIKICAgdGlmZjpPcmllbnRhdGlvbj0iMSIKICAgeG1wOkNyZWF0b3JUb29sPSJHSU1QIDIuMTAiPgogICA8aXB0Y0V4dDpMb2NhdGlvbkNyZWF0ZWQ+CiAgICA8cmRmOkJhZy8+CiAgIDwvaXB0Y0V4dDpMb2NhdGlvbkNyZWF0ZWQ+CiAgIDxpcHRjRXh0OkxvY2F0aW9uU2hvd24+CiAgICA8cmRmOkJhZy8+CiAgIDwvaXB0Y0V4dDpMb2NhdGlvblNob3duPgogICA8aXB0Y0V4dDpBcnR3b3JrT3JPYmplY3Q+CiAgICA8cmRmOkJhZy8+CiAgIDwvaXB0Y0V4dDpBcnR3b3JrT3JPYmplY3Q+CiAgIDxpcHRjRXh0OlJlZ2lzdHJ5SWQ+CiAgICA8cmRmOkJhZy8+CiAgIDwvaXB0Y0V4dDpSZWdpc3RyeUlkPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iLyIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo2ZDM2YjNkZi1kNTVlLTQ0MGQtYmEyMS0xNzYzMmIzZDZkZTEiCiAgICAgIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkdpbXAgMi4xMCAoTGludXgpIgogICAgICBzdEV2dDp3aGVuPSIrMDE6MDAiLz4KICAgIDwvcmRmOlNlcT4KICAgPC94bXBNTTpIaXN0b3J5PgogICA8cGx1czpJbWFnZVN1cHBsaWVyPgogICAgPHJkZjpTZXEvPgogICA8L3BsdXM6SW1hZ2VTdXBwbGllcj4KICAgPHBsdXM6SW1hZ2VDcmVhdG9yPgogICAgPHJkZjpTZXEvPgogICA8L3BsdXM6SW1hZ2VDcmVhdG9yPgogICA8cGx1czpDb3B5cmlnaHRPd25lcj4KICAgIDxyZGY6U2VxLz4KICAgPC9wbHVzOkNvcHlyaWdodE93bmVyPgogICA8cGx1czpMaWNlbnNvcj4KICAgIDxyZGY6U2VxLz4KICAgPC9wbHVzOkxpY2Vuc29yPgogIDwvcmRmOkRlc2NyaXB0aW9uPgogPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+09JMsgAAAAZiS0dEAPUArwAJ0m/GqwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QMFxMLLIZz2RIAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABE0lEQVRYw+2XP8vCMBDGn8dEVFxcXDorfv+P4ih1dnFxkZfyGs7BJ1ActJhCDvEgUELu+uv9yV2JMml7z9tPjUwKIWBmpSbKIcYQFxCxNBo/CMnNA0TyAPGnkLAmxEXeCDUhTh4gWgD/AKY1IQ4AOgCzmhBHlWmsCXEeA4L6Gnu6BU3Gk8rwoiRsFYKjAK5mlkgGAEsAawAbADu19gbACsBcyRv1TvbK2uKAdmyCSUrCToAZMkk/73U6l3VeGif5cCPJd94KWlMlYdQKZgZ5Iu/NdC7rcEg4SqQxsxvJqHBVScx1LzGrQWx698S+FsTOw4259dA7Gg8QKw/zxMLDZBU8QEQPEPwaiN+/6GgQb8aAQXIHcuhPAeAsBVoAAAAASUVORK5CYII=',
// x y Position offset of the colorPicker Cursor
    CX = 16, CY = 16;
// END Image files (64Base) -------------------------------------------------------------------------------------------


// BEG --- write content for the colorWheel into the document ---------------------------------------------------------
/* jslint evil: true, regexp: false */

// BEG of internal CSS ------------------------------------------------------------------------------------------------
document.write('<style>'+
  '@charset "UTF-8";'+
  '@charset "iso-8859-15";'+
'\n'+
  '.cwContainer {'+
  '  width:    100%;'+
  '  height:   -1000px;'+
  '  top:      0px;'+
  '  margin:   auto;'+
  '  position: absolute;'+
  '  z-index:  1;'+
  '  overflow: hidden;'+
  '}'+
'\n'+
  '.cwPCa {'+
  '    font-family:           monospace;'+
  '    font-size:             35px;'+
  '    font-weight:           bold;'+
  '    color:                 rgb(255,255,255);'+
  '    padding-top:           15px;'+
  '    padding-bottom:        15px;'+
  '    text-align:            center;'+
  '    border-radius:         5px;'+
  '    position:              relative;'+
  '    text-shadow:           1px 1px 4px rgb(0,0,0);'+
  '    background-image:     -webkit-linear-gradient(top, rgb(0,0,0),rgb(0,0,0)),url("'+TB+'");'+
  '    user-select:           text;'+
  '    -webkit-touch-callout: text;'+
  '    -webkit-user-select:   text;'+
  '    -khtml-user-select:    text;'+
  '    -moz-user-select:      text;'+
  '    -ms-user-select:       text;'+
  '    z-index:                1;'+
  '  }'+
'\n'+
  '.cwCBa {'+
  '    top:           -521px;'+
  '    height:         212px;'+
  '    position:       relative;'+
  '    opacity:        1;'+
  '    transition:     all 0.5s ease 0s;'+
  '    z-index:        2;'+
  '    pointer-events: none;'+
  '    opacity:        0.5;'+
  '  }'+
'\n'+
  '.cwCBaA {'+
  '    top:       -521px;'+
  '    height:     212px;'+
  '    position:   relative;'+
  '    opacity:    1;'+
  '    transition: all 0.5s ease 0s;'+
  '    z-index:    2;'+
  '  }'+
'\n'+
  '.cwPg {'+
  '    border:   solid 0px;'+
  '    left:     0px;'+
  '    top:     -420px;'+
  '    position: relative;'+
  '  }'+
'\n'+
  '.cwPf {'+
  '    width:    100%;'+
  '    border:   solid 0px;'+
  '    left:     0px;'+
  '    top:     -518px;'+
  '    position: relative;'+
  '  }'+
'\n'+
  '.cwPf table{'+
  '    width: 100%;'+
  '    border-spacing: 0px;'+
  '  }'+
'\n'+
  '.cwPTable {'+
  '    top: -653px;'+
  '    left:            -10px;'+
  '    width:            828px;'+
  '    height:           505px;'+
  '    border-spacing:   10px;'+
  '    padding:          5px;'+
  '    position:         absolute;'+
  '    border-radius:    10px;'+
  '    border-top:       solid 2px rgba(0,0,0,1);'+
  '    border-left:      solid 2px rgba(0,0,0,1);'+
  '    border-bottom:    solid 2px rgba(255,255,255,1);'+
  '    border-right:     solid 2px rgba(255,255,255,1);'+
  '    background-color: #cbcbcb;'+
  '    box-shadow:       0px 0px 5px 1px rgba(0,0,0,0);'+
  '    z-index: 3;'+
  '  }'+
'\n'+
  '.cwPTable td {'+
  '    border:        solid 0px #FFFFFF;'+
  '    border-radius: 0px;'+
  '    box-shadow:    0px 0px  0px 2px rgba(0,0,0,1),'+
  '                   0px 0px 10px 0px rgba(0,0,0,1);'+
  '    transition:    all 0.25s ease 0s;'+
  '  }'+
'\n'+
  '.cwPTable td:hover {'+
  '    box-shadow: 0px 0px 0px  2px rgba(255,255,255,1),'+
  '                0px 0px 10px 0px rgba(0,0,0,1);'+
  '    cursor:     pointer;'+
  '    transition: all 0.25s ease 0s;'+
  '  }'+
'\n'+
  '.cwPTable td:active {'+
  '    box-shadow: 0px 0px 10px 6px rgba(255,255,255,1),'+
  '                0px 0px 0px  0px rgba(0,0,0,0);'+
  '    cursor:     pointer;'+
  '    transition: all 0.25s ease 0s;'+
  '    border-radius: 25%;'+
  '  }'+
'\n'+
  '.cwPBOX {'+
  '    top:              50px;'+
  '    left:             0px;'+
  '    padding:          25px;'+
  '    position:         relative;'+
  '    width:            812px;'+
  '    height:           630px;'+
  '    z-index:          500;'+
  '    border-radius:    10px;'+
  '    border-top:       solid 2px rgba(255,255,255,0.5);'+
  '    border-left:      solid 2px rgba(255,255,255,0.5);'+
  '    border-bottom:    solid 2px rgba(0,0,0,0.5);'+
  '    border-right:     solid 2px rgba(0,0,0,0.5);'+
  '    background-color: #E2E2E2;'+
  '    box-shadow:       3px 3px 25px 1px rgba(0,0,0,0.5);'+
  '    overflow:         hidden;'+
  '  }'+
'\n'+
  '.cwPO, .cwPAf, .cwPAe, .cwPAd, .cwPAc, .cwPv, .cwRBb, .cwPCa {'+
  '    border:     solid 0px rgba(0,0,0,0);'+             /* use this fake border setting for the "box shadow"-workaround */
  '    box-shadow: 0px 0px 0px 1px rgba(255,255,255,1),'+ /*  use "box-shadow"-workaround for borders and shadows, */
  '                0px 0px 0px 2px rgba(0,0,0,1);'+       /* it also ensures that the position of the colorWheel always remains correct. */
  '  }'+
'\n'+
  '.cwPO, .cwPAf, .cwPAe {'+
  '    border-radius: 50%;'+
  '  }'+
'\n'+
  '.cwPAd, .cwPAc, .cwPv, .cwRBb {'+
  '    width:         808px;'+
  '    border-radius: 3px;'+
  '  }'+
'\n'+
  '.cwPO {'+
  '    left:     276px;'+
  '    top:     -286px;'+
  '    position: relative;'+
  '    width:    256px;'+
  '    height:   256px;'+
  '  }'+
'\n'+
  '.cwPAf {'+
  '    left:     0px;'+
  '    top:     -30px;'+
  '    position: relative;'+
  '    width:    256px;'+
  '    height:   256px;'+
  '  }'+
'\n'+
  '.cwPAe {'+
  '    left:     552px;'+
  '    top:     -542px;'+
  '    position: relative;'+
  '    width:    256px;'+
  '    height:   256px;'+
  '  }'+
'\n'+
  '.cwPAd {'+
  '    left:     0px;'+
  '    top:      0px;'+
  '    position: relative;'+
  '  }'+
'\n'+
  '.cwPAc {'+
  '    left:     0px;'+
  '    top:      20px;'+
  '    position: relative;'+
  '    z-index:  500;'+
  '  }'+
'\n'+
  '.cwRBb {'+
  '    left:     0px;'+
  '    top:      40px;'+
  '    position: relative;'+
  '  }'+
'\n'+
  '.cwPv {'+
  '    left:     0px;'+
  '    top:      60px;'+
  '    position: relative;'+
  '  }'+
'\n'+
  '.cwP, .cwPa, .cwPb {'+
  '    filter: blur(0px);'+
  '  }'+
'\n'+
  '.cwP, .cwPa, .cwPb, .cwPc, .cwPd, .cwPe {'+
  '    border-radius:    50%;'+
  '    border:           solid 0px rgba(0, 0, 0, 1);'+
  '    background-color: #000000;'+
  '    cursor:           grabbing;'+
  '  }'+
'\n'+
  '.cwPc, .cwPd {'+
  '    border-radius: 0%;'+
  '  }'+
'\n'+
  '.cwPe {'+
  '    border-radius:    0%;'+
  '    background-image: url("'+TB+'");'+
  '  }'+
'\n'+
  '.cwP:active, .cwP:hover, .cwPa:active, .cwPa:hover, .cwPb:active, .cwPb:hover, .cwPc:active, .cwPc:hover, .cwPd:active, .cwPd:hover, .cwPe:active, .cwPe:hover, .cwPRw:active, .cwPRw:hover {'+
  '    cursor:                url("'+CP+'") '+CX+' '+CY+', auto;'+
  '  }'+
'\n'+
  '#colorPickerCcw {'+
  '    left:  -16000px;'+
  '    top:   -16000px;'+
  '    cursor:                url("'+CP+'") '+CX+' '+CY+', auto;'+
  '  }'+
'\n'+
  '.cwPCb {'+
  '    width:            64px;'+
  '    height:           64px;'+
  '    left:             0px;'+
  '    top:             -10000000000000000px;'+
  '    position:         relative;'+
  '    border:           solid 2px rgba(255, 255, 255, 1);'+
  '    border-radius:    50%;'+
  '    background-color: #000000;'+
  '    box-shadow:       0px 0px 5px rgba(0,0,0,1);'+
  '    transition:       all 0.5s ease 0s;'+
  '    z-index:          534;'+
  '  }'+
'\n'+
  '.cwPAb, .cwPAa, .cwAa, .cwRBa {'+
  '    width:               23px;'+
  '    height:              46px;'+
  '    position:            absolute;'+
  '    background-image:    url("'+AS+'");'+
  '    top:                -2;'+
  '    left:                0px;'+
  '    -webkit-user-select: none;'+
  '    -khtml-user-select:  none;'+
  '    -moz-user-select:    none;'+
  '    -o-user-select:      none;'+
  '    user-select:         none;'+
  '    transition:          all 0.5s ease 0s;'+
  '  }'+
'\n'+
  '.cwAa {'+
  '    left: 0px;'+
  '  }'+
'\n'+
  '.cwPButton {'+
  '    padding:          5px;'+
  '    width:            230px;'+
  '    border:           solid 2px rgba(255,255,255,1);'+
  '    background-color: #CCCCCC;'+
  '    font-family:      monospace;'+
  '    font-size:        20px;'+
  '    border-top:       solid 1px rgba(255,255,255,1);'+
  '    border-bottom:    solid 1px rgba(0,0,0,1);'+
  '    border-left:      solid 1px rgba(255,255,255,1);'+
  '    border-right:     solid 1px rgba(0,0,0,1);'+
  '    transition:       all 1s ease 0s;'+
  '    outline:          none;'+
  '  }'+
'\n'+
  '.cwPButton:hover {'+
  '    color:            #FFFFFF;'+
  '    background-color: #777777;'+
  '    transition:       all 0.5s ease 0s;'+
  '  }'+
'\n'+
  '.cwPButton:active {'+
  '    color:            #FFFFFF;'+
  '    background-color: #555555;'+
  '    border-top:       solid 1px rgba(0,0,0,1);'+
  '    border-bottom:    solid 1px rgba(255,255,255,1);'+
  '    border-left:      solid 1px rgba(0,0,0,1);'+
  '    border-right:     solid 1px rgba(255,255,255,1);'+
  '    transition:       all 0.5s ease 0s;'+
  '  }'+
'\n'+
  '.cwPButtonColor, .cwPButtonColorOnly{'+
  '    border-spacing:  0;'+
  '    border-width:    0px;'+
  '    margin:          0px;'+
  '    padding:         0px;'+
  '    color:           #000000;'+
  '    font-family:     monospace;'+
  '    font-size:       16px;'+
  '    border-top:      solid 2px rgba(255,255,255,1);'+
  '    border-bottom:   solid 2px rgba(0,0,0,1);'+
  '    border-left:     solid 2px rgba(255,255,255,1);'+
  '    border-right:    solid 2px rgba(0,0,0,1);'+
  '    transition:      all 0.5s ease 0s;'+
  '    outline:         none;'+
  '  }'+
'\n'+
  '.cwPButtonColor th {'+
  '    width:      50%;'+
  '    padding:    0px 10px 0px 10px;'+
  '    text-align: center;'+
  '  }'+
'\n'+
  '.cwPButtonColorOnly th {'+
  '    width:      50%;'+
  '    padding:    0px 10px 0px 10px;'+
  '    text-align: center;'+
  '  }'+
'\n'+
  '.cwPButtonColor:hover, .cwPButtonColorOnly:hover{'+
  '    color:            #FFFFFF;'+
  '    background-color: #777777;'+
  '    text-shadow: 1px 1px 3px #000000;'+
  '    border-top:    solid 2px rgba(0,0,0,1);'+
  '    border-bottom: solid 2px rgba(255,255,255,1);'+
  '    border-left:   solid 2px rgba(0,0,0,1);'+
  '    border-right:  solid 2px rgba(255,255,255,1);'+
  '  }'+
'\n'+
  '.cwPButtonInput {'+
  '    width:         100px;'+
  '    padding-left:  0px;'+
  '    font-family:   monospace;'+
  '    font-size:     16px;'+
  '    border-top:    solid 2px rgba(0,0,0,1);'+
  '    border-bottom: solid 2px rgba(255,255,255,1);'+
  '    border-left:   solid 2px rgba(0,0,0,1);'+
  '    border-right:  solid 2px rgba(255,255,255,1);'+
  '    background-color: rgba(220,220,220,1);'+
  '    transition:    all 0.5s ease 0s;'+
  '    outline:       none;'+
  '  }'+
'\n'+
  '.cwPButtonColorOnly {'+
  '    width:           auto;'+
  '    background-color: rgba(200,200,200,1);'+
  '  }'+
'\n'+
  '.cwPButtonRGBA, .cwPButtonRGBAa {'+
  '    width: 50px;'+
  '    font-family:   monospace;'+
  '    font-size:     16px;'+
  '    border-top:    solid 2px rgba(0,0,0,1);'+
  '    border-bottom: solid 2px rgba(255,255,255,1);'+
  '    border-left:   solid 2px rgba(0,0,0,1);'+
  '    border-right:  solid 2px rgba(255,255,255,1);'+
  '    background-color: rgba(220,220,220,1);'+
  '    cursor:        row-resize;'+
  '    outline:       none;'+
  '  }'+
'\n'+
  '.cwPButtonRGBAa {'+
  '    width: 60px;'+
  '  }'+
'\n'+
  '.cwPButtonColorFrame {'+
  '    border-spacing: 0;'+
  '    border-width:   0;'+
  '    margin:         0;'+
  '    padding:        0;'+
  '    float:          left;'+
  '    border:         solid 0px white;'+
  '  }'+
'\n'+
  '.cwBpc {'+
  '    top:          -60px;'+
  '    width:         48px;'+
  '    height:        48px;'+
  '    border:        solid 2px white;'+
  '    border-radius: 50%;'+
  '    z-index:       1000;'+
  '    margin:        auto;'+
  '    position:      absolute;'+
  '    z-index:       1;'+
  '    overflow:      hidden;'+
  '    transition:    all 0.5s ease 0s;'+
  '  }'+
'</style>');
// END of internal CSS ------------------------------------------------------------------------------------------------


// Create main container for colorWheel -------------------------------------------------------------------------------
  document.write('<div class="cwBpc" id="cwBpc"></div><div class="cwContainer" id="cwContainer"></div>');

// getElementById shorter ---------------------------------------------------------------------------------------------
  function ID$(a){
      return document.getElementById(a);
    }

// --- activation of the colorBars ------------------------------------------------------------------------------------
  function bars(){
      ID$("cwCBa").classList.remove("cwCBa");
      ID$("cwCBa").classList.add("cwCBaA");
    }


  function cwColorButton(name,r,g,b,a,values,x,y,textAlign,inputType,borderRadius){
      name = name.replace(" ", "&nbsp;").replace("_", "&nbsp;").replace("-", "&nbsp;").replace("–", "&nbsp;");
      a = (a/100).toFixed(2);
      var c = 'onclick="openColorWheelSetColor(this.id)"';
      document.write('<input type="'+inputType+'" class="cwPButtonInput" id="cwPButton'+bN+'Value" value="'+r+','+g+','+b+','+a+'" style="height:'+y+'; border-radius:'+borderRadius+';" readonly>');
      var d = ID$("cwPButton"+bN+"Value").value.split(',');
      switch (values){
          case "values":
              document.write('<table class="cwPButtonColorFrame" id="cwPButtonFrame'+bN+'"><tr><th><table class="cwPButtonColor" id="cwPButton'+bN+'" '+c+'><tr><th style="text-align: '+textAlign+';">'+name+'</th><th>&nbsp;</th></tr></table></th><th><input id="cwPButtonRGBAr'+bN+'" onchange="openColorWheelSetColorRGBAchange(this.id)" onblur="openColorWheelSetColorRGBAblur(this.id)" class="cwPButtonRGBA" type="number" min="0" max="255" step="1" value="'+d[0]+'" style="height:'+y+'; border-radius:'+borderRadius+';"><input id="cwPButtonRGBAg'+bN+'" onchange="openColorWheelSetColorRGBAchange(this.id)" onblur="openColorWheelSetColorRGBAblur(this.id)" class="cwPButtonRGBA" type="number" min="0" max="255" step="1" value="'+d[1]+'" style="height:'+y+'; border-radius:'+borderRadius+';"><input id="cwPButtonRGBAb'+bN+'" onchange="openColorWheelSetColorRGBAchange(this.id)" onblur="openColorWheelSetColorRGBAblur(this.id)" class="cwPButtonRGBA" type="number" min="0" max="255" step="1" value="'+d[2]+'" style="height:'+y+'; border-radius:'+borderRadius+';"><input id="cwPButtonRGBAa'+bN+'" onchange="openColorWheelSetColorRGBAchange(this.id)" onblur="openColorWheelSetColorRGBAblur(this.id)" class="cwPButtonRGBAa" type="number" min="0.00" max="1.00" step="0.01" value="'+d[3]+'" style="height:'+y+'; border-radius:'+borderRadius+';"></th></tr></table>');
            break;
          case "onlyButton":
              document.write('<table class="cwPButtonColorFrame" id="cwPButtonFrame'+bN+'" onmouseover="cwColorButtonOver(this.id)" onmouseout="cwColorButtonOut(this.id)"><tr><th><table class="cwPButtonColorOnly" style="width:'+x+'; height:'+y+'; border-radius:'+borderRadius+';" id="cwPButtonColorOnly'+bN+'" '+c+'><tr><th style="text-align: '+textAlign+';">'+name+'</th></tr></table></th></tr></table>');
            break;
          case "colorButton":
              document.write('<table class="cwPButtonColorFrame" id="cwPButtonFrame'+bN+'"><tr><th><table class="cwPButtonColor" id="cwPButton'+bN+'" '+c+'><tr><th style="text-align: '+textAlign+';">'+name+'</th><th>&nbsp;</th></tr></table></th></tr></table>');
            break;
          default:
        }
      if(ID$("cwPButton"+bN)) {
          ID$("cwPButton"+bN).style = 'background-image:-webkit-linear-gradient(left, rgba(200,200,200,1) 49.00%, #000000 49.50%, #000000 50.00%, #FFFFFF 50.50%, #FFFFFF 50.75%, rgba('+r+','+g+','+b+','+a+') 51%, rgba('+r+','+g+','+b+','+a+') 100%, rgba('+r+','+g+','+b+','+a+')), url("'+TB+'"); width:'+x+'; height:'+y+'; border-radius:'+borderRadius+';';
        }
      bN += 1;
    }


  function cwColorButtonOver(id){
      var a = id.replace( /^\D+/g, ''),
          b = ID$("cwPButton"+a+"Value").value,
          c = ID$("cwBpc");
      c.style.left = event.clientX-25;
      c.style.top  = event.clientY-25;
      var reX = c.style.top.replace("px","");
      if(reX < 5){
        c.style.top  = 5;
        c.style.left = event.clientX+20;
      }
      else {
          c.style.top  = event.clientY-70;
        }
      c.style.opacity = 1;
      c.style.backgroundImage = "-webkit-linear-gradient(top, rgba("+b+"),rgba("+b+")),url('"+TB+"')";
    }


  function cwColorButtonOut(id){
      ID$("cwBpc").style.opacity =  0;
      ID$("cwBpc").style.top     = -60;
    }


  function openColorWheelSetColor(id){
      var x = id.replace( /^\D+/g, ''),
          a = ID$("cwPButton"+x+"Value").value,
          b = "rgba("+a+")",
          c = b.replace(","," ").replace(","," ").replace(","," ").replace("1.00","1").replace("rgba(","").replace(")",""),
          d = a.split(',');
      openColorWheel();
      ID$("cwPCa").style.backgroundImage = "-webkit-linear-gradient(top, "+b+","+b+"),url('"+TB+"')";
      ID$("cwPCa").innerHTML = d[0]+" "+d[1]+" "+d[2]+" ("+d[3].replace("1.00","1")+")";
      bS = id.replace( /^\D+/g, '');
    }


  function openColorWheelSetColorRGBAchange(id){
      var a = id.replace( /^\D+/g, ''),
          b = ID$("cwPButtonRGBAr"+a).value,
          c = ID$("cwPButtonRGBAg"+a).value,
          d = ID$("cwPButtonRGBAb"+a).value,
          e = ID$("cwPButtonRGBAa"+a).value;
          f = "rgba("+b+","+c+","+d+","+e+")";
      var g = ID$("cwPButton"+a).style.height,
          h = ID$("cwPButton"+a).style.width;
      ID$("cwPButton"+a+"Value").value = b+","+c+","+d+","+e;
      ID$("cwPButton"+a).style = 'background-image:-webkit-linear-gradient(left, rgba(200,200,200,1) 49.00%, #000000 49.50%, #000000 50.00%, #FFFFFF 50.50%, #FFFFFF 50.75%, '+f+' 51%, '+f+' 100%, '+f+'), url("'+TB+'"); height:'+g+'; width:'+h+';';
    }


  function openColorWheelSetColorRGBAblur(id){
      var a = id.replace( /^\D+/g, ''),
          b = ID$("cwPButtonRGBAr"+a).value,
          c = ID$("cwPButtonRGBAg"+a).value,
          d = ID$("cwPButtonRGBAb"+a).value,
          e = ID$("cwPButtonRGBAa"+a).value;
      ID$("cwPButtonRGBAr"+a).value = Math.round(b*1);
      ID$("cwPButtonRGBAg"+a).value = Math.round(c*1);
      ID$("cwPButtonRGBAb"+a).value = Math.round(d*1);
      ID$("cwPButtonRGBAa"+a).value = Math.round(e*100).toFixed(2)/100;
      if(b > 255 ){ ID$("cwPButtonRGBAr"+a).value = 255; }
      if(c > 255 ){ ID$("cwPButtonRGBAg"+a).value = 255; }
      if(d > 255 ){ ID$("cwPButtonRGBAb"+a).value = 255; }
      if(e >  1  ){ ID$("cwPButtonRGBAa"+a).value =  1;  }
      if(b <  0  ){ ID$("cwPButtonRGBAr"+a).value =  0;  }
      if(c <  0  ){ ID$("cwPButtonRGBAg"+a).value =  0;  }
      if(d <  0  ){ ID$("cwPButtonRGBAb"+a).value =  0;  }
      if(e <  0  ){ ID$("cwPButtonRGBAa"+a).value =  0;  }
      if(b == "" ){ ID$("cwPButtonRGBAr"+a).value =  0;  }
      if(c == "" ){ ID$("cwPButtonRGBAg"+a).value =  0;  }
      if(d == "" ){ ID$("cwPButtonRGBAb"+a).value =  0;  }
      if(e == "" ){ ID$("cwPButtonRGBAa"+a).value =  1;  }
      openColorWheelSetColorRGBAchange(id);
    }


  function readTDbgColor(a){
      ID$("cwPCb").style.top = "-10000000000000000px";
      var b = getComputedStyle(ID$(a), null).getPropertyValue("background-color"),
          c = b.replace("rgb(","").replace(")","").replace(" ","").replace(" ","").split(',');
      ID$("cwPCa").style.backgroundImage = "-webkit-linear-gradient(top, rgba("+c[0]+","+c[1]+","+c[2]+",1),rgba("+c[0]+","+c[1]+","+c[2]+",1)),url('"+TB+"')";
      ID$("cwPCa").innerHTML = c[0]+" "+c[1]+" "+c[2]+" (1)";
    }


// --- Main Function --------------------------------------------------------------------------------------------------
function openColorWheel(){
  // create the main part of the HTML color picker --------------------------------------------------------------------
    var a = '<div class="cwPBOX" id="cwPBOX"><div class="cwPCa" id="cwPCa"></div><div class="cwPCb" id="cwPCb"></div><div class="cwPAf"><div class="cwPRa" >'+
            '<canvas id="cwPa"  class="cwPa"  width="'+colorWheelDiameter+'" height="'+colorWheelDiameter+'">'+canvasError+'</canvas></div></div><div class="cwPO"><div class="cwPR" >'+
            '<canvas id="cwP"   class="cwP"   width="'+colorWheelDiameter+'" height="'+colorWheelDiameter+'">'+canvasError+'</canvas></div></div><div class="cwPAe"><div class="cwPRb" >'+
            '<canvas id="cwPb"  class="cwPb"  width="'+colorWheelDiameter+'" height="'+colorWheelDiameter+'">'+canvasError+'</canvas></div></div><div id="cwCBa" class="cwCBa"><div class="cwPAd"><div id="cwPAb" class="cwPAb"></div><div class="cwPRc" >'+
            '<canvas id="cwPc"  class="cwPc"  width="'+colorBarWidth+'"      height="'+colorBarHeight+'"    >'+canvasError+'</canvas></div></div><div class="cwPAc"><div id="cwPAa" class="cwPAa"></div><div class="cwPRd" >'+
            '<canvas id="cwPd"  class="cwPd"  width="'+colorBarWidth+'"      height="'+colorBarHeight+'"    >'+canvasError+'</canvas></div></div><div class="cwRBb"><div id="cwRBa" class="cwAa"></div><div class="cwPRf" >'+
            '<canvas id="cwPRw" class="cwPRw" width="'+colorBarWidth+'"      height="'+colorBarHeight+'"    >'+canvasError+'</canvas></div></div><div class="cwPv"><div id="cwAa" class="cwAa"></div><div class="cwPRe">'+
            '<canvas id="cwPe"  class="cwPe"  width="'+colorBarWidth+'"      height="'+colorBarHeight+'"    >'+colorBarHeight+'</canvas></div></div></div><div class="cwPf"><table><tr>'+
            '<td style="text-align: left;"><input class="cwPButton" id="cwCL" type="button" value="Cancel"></td><td style="text-align: center;"><input class="cwPButton" id="cwDC" type="button" value="Default Colors"></td><td style="text-align: right;"><input class="cwPButton" id="cwSAVE" type="button" value="OK"></td>'+'</tr></table></div><div id="cwPg" class="cwPg"></div></div>';
    ID$("cwContainer").innerHTML    = a;
    ID$("cwContainer").style.top    = "0px";
    ID$("cwContainer").style.height = "100%";


  // BEG --- send to getElementById shorter ---------------------------------------------------------------------------
    var IDa = 'cwCL',   cA = ID$(IDa),
        IDb = 'cwPCa',  cF = ID$(IDb),
        IDc = 'cwPCb',  pC = ID$(IDc),
        IDd = 'cwDC',   dC = ID$(IDd),
        IDe = 'cwPa',   aB = ID$(IDe),
        IDf = 'cwP',    aA = ID$(IDf),
        IDg = 'cwPb',   aC = ID$(IDg),
        IDh = 'cwPAb',  pB = ID$(IDh),
        IDi = 'cwPc',   aD = ID$(IDi),
        IDj = 'cwPAa',  pA = ID$(IDj),
        IDk = 'cwPd',   aE = ID$(IDk),
        IDl = 'cwRBa',  pR = ID$(IDl),
        IDm = 'cwPRw',  aG = ID$(IDm),
        IDn = 'cwAa',   pD = ID$(IDn),
        IDo = 'cwPe',   aF = ID$(IDo),
        IDp = 'cwPg',   aH = ID$(IDp),
        IDr = 'cwSAVE', aI = ID$(IDr),
  // --- send to getElementById shorter -------------------------------------------------------------------------------
        sA = aA, // currently selected canvas-object (colorWheel / colorBar)
        sP = aA, // for colorWheel / colorBar from 0 for no selection and 1-3 for colorWheel and 4-6 for colorBar
        bA = aA.getContext("2d"),
        bB = aB.getContext("2d"),
        bC = aC.getContext("2d"),
        bD = aD.getContext("2d"),
        bE = aE.getContext("2d"),
        bF = aF.getContext("2d"),
        bG = aG.getContext("2d");
  // ÉND --------------------------------------------------------------------------------------------------------------


  // BEG --- create the colorWheel / colorBar (1-3) for the selection -------------------------------------------------
    var colorWheel = function(wR,uR,uG,uB,q){
        var i = 0;
        while (i < g){
            var beg = (2/360)*i+(2/360*wR),
                clP = Math.round((256/g)*i),
                clM = Math.round(256-((256/g)*i))-1;
                 i += t;
            var end = (2/360)*i+(2/360*wR),
                ri  = 0;

            bA.beginPath(); // create colorWheel 1
            bB.beginPath(); // create colorWheel 2
            bC.beginPath(); // create colorWheel 3

            // BEG --- buffering of the color states ---
                sR = uR; sG = uG; sB = uB;
                if (uR == "+"){ sR = clP; } if (uG == "+"){ sG = clP; } if (uB == "+"){ sB = clP; }
                if (uR == "-"){ sR = clM; } if (uG == "-"){ sG = clM; } if (uB == "-"){ sB = clM; }
            // END --- buffering of the color states ---

            while (ri < r){
                ri += 1;
                bA.arc(x, y, s+ri, beg * Math.PI, end * Math.PI);
                if(q != "do_not_change_the_wheel_SEL_color"){
                    bB.arc(x, y, s+ri, beg * Math.PI, end * Math.PI);
                  }
                if(q != "do_not_change_the_wheel_SEL_color_INV"){
                    bC.arc(x, y, s+ri, beg * Math.PI, end * Math.PI);
                  }
                bA.strokeStyle = "rgb(" + sR + "," + sG + "," + sB + ")";
                bB.strokeStyle = "rgb(" + sR + "," + sG + "," + sB + ")";
                bC.strokeStyle = "rgb(" + sR + "," + sG + "," + sB + ")";
              }
            bA.stroke(); // draw calculated colorWheel 1
            bB.stroke(); // draw calculated colorWheel 2
            bC.stroke(); // draw calculated colorWheel 3
          }
        };
  // END --- create the colorWheel / colorBar (1-3) for the selection -------------------------------------------------


  // if the g-value is at 60° the circle is compvarely closed
      colorWheel(0  ,255, 0 ,"+"); // (360°)   0° -  59°
      colorWheel(60 ,"-", 0 ,255); // ------  60° - 119°
      colorWheel(120, 0 ,"+",255); // ------ 120° - 179°
      colorWheel(180, 0 ,255,"-"); // ------ 180° - 239°
      colorWheel(240,"+",255, 0 ); // ------ 240° - 299°
      colorWheel(300,255,"-", 0 ); // ------ 300° - 359°

      var mousePOS = function(a,b){
          var c = function(d){
              var e = 0,
                  f = 0;
              if (d.offsetParent){
                do    { e += d.offsetLeft;
                        f += d.offsetTop; }
                while ((d = d.offsetParent));
                  d = { x:e, y:f };
                    return d;
                  }
                  return undefined;
              };
            var g = c(a),
                h = { x: (b.pageX - g.x),
                      y: (b.pageY - g.y) };
                return h;
        };

      aA.addEventListener("mousedown",function(){ m = true; });

      var setCWactX = sX.value,
          setCWactY = sY.value;

  // BEG --- colorWheelSetCC ------------------------------------------------------------------------------------------
      function colorWheelSetCC(a,q){
            var b;
            if(!q){     q = aA; }
            if(!a){  b = aA; }
            else  {  b = mousePOS(sA,a); }
            var c = sA.getContext('2d'),
                d;
            if(bR == 1){
                bars();
              }
            bR += 1;

  /* -- WORKAROUND -- WORKAROUND -- WORKAROUND -- WORKAROUND -- WORKAROUND -- WORKAROUND -- WORKAROUND -- WORKAROUND --
      BEG --- adjustment to avoid that for the color Bar incorrect color values are transmitted for the Y (height),
              which would result in black being determined as the color. */
            if(!a){ d = c.getImageData(0, 0, 1, 1).data; }
            else   {
                if(q == "do_not_change_the_wheel_color"      ||
                   q == "do_not_change_the_wheel_brightness" ||
                   q == "do_not_change_the_wheel_rainbow"      ||
                   q == "do_not_change_the_wheel_alpha" ){
                   // colorBar: use a fixed height (Y) to avoid a false read with a black color
                       if(b.x > (colorBarWidth-1)){ b.x = (colorBarWidth-1); }
                          d = c.getImageData(b.x, 5, 1, 1).data;}
                   // colorWheel: normal Y-query, is needed for the color position in the colorWheel
                else { d = c.getImageData(b.x, b.y, 1, 1).data;
                }
              }
  // END --------------------------------------------------------------------------------------------------------------
            cF.style.backgroundImage = "-webkit-linear-gradient(top, rgba("+d[0]+","+d[1]+","+d[2]+", " + f + "),rgba("+d[0]+","+d[1]+","+d[2]+", " + f + ")),url('"+TB+"')";
            cF.innerHTML = d[0]+" "+d[1]+" "+d[2];


  // --- if the g-value is at 60° the circle is compvarely closed -----------------------------------------------------
            colorWheel(0  ,255, 0 ,"+",q); // (360°)   0° -  59° with q-switch-value
            colorWheel(60 ,"-", 0 ,255,q); // ------  60° - 119° with q-switch-value
            colorWheel(120, 0 ,"+",255,q); // ------ 120° - 179° with q-switch-value
            colorWheel(180, 0 ,255,"-",q); // ------ 180° - 239° with q-switch-value
            colorWheel(240,"+",255, 0 ,q); // ------ 240° - 299° with q-switch-value
            colorWheel(300,255,"-", 0 ,q); // ------ 300° - 359° with q-switch-value


  // BEG --- determination of dynamic colour values and coloured light values -----------------------------------------
            var greyV = Math.round((d[0]+d[1]+d[2])/3),
                invCR = Math.round(255-d[0]),
                invCG = Math.round(255-d[1]),
                invCB = Math.round(255-d[2]),
                luxCV = (1-((1/255)*greyV)).toFixed(2);

            if(luxCV == "1.00"){ luxCV = "1"; }
            if(luxCV == "0.00"){ luxCV = "0"; }
            var dynColorValue = Math.round((colorBarWidth-24)*luxCV);
  // END --------------------------------------------------------------------------------------------------------------


  // BEG --- create color wheel 1 -------------------------------------------------------------------------------------
            var wA = bA.createRadialGradient(128, 128, 14, 128, 128, 50);
                wA.addColorStop(0, "rgba(255, 255, 255, 1)");
                wA.addColorStop(1, "rgba(255, 255, 255, 0)");
                bA.fillStyle = wA;
                bA.fillRect(0, 0, 256, 256);

            var wB = bA.createRadialGradient(128, 128, 74, 128, 128, 120);
                wB.addColorStop(0, "rgba(0, 0, 0, 0)");
                wB.addColorStop(1, "rgba(0, 0, 0, 1)");
                bA.fillStyle = wB;
                bA.fillRect(0, 0, 256, 256);
  // END --------------------------------------------------------------------------------------------------------------


  // BEG --- create color wheel 2 -------------------------------------------------------------------------------------
            if(q != "do_not_change_the_wheel_SEL_color"){
              var wC;
              if(q == "do_not_change_the_wheel_SEL_color_INV"){
                    wC = bB.createRadialGradient(128, 128, 14, 128, 128, 128);
                    wC.addColorStop(0, "rgba("+invCR+","+invCG+","+invCB+", 1)");
                    wC.addColorStop(1, "rgba("+invCR+","+invCG+","+invCB+", 0)");
                    bB.fillStyle = wC;
                    bB.fillRect(0, 0, 256, 256);
                  }
              else {
                    wC = bB.createRadialGradient(128, 128, 14, 128, 128, 128);
                    wC.addColorStop(0, "rgba("+d[0]+","+d[1]+","+d[2]+", 1)");
                    wC.addColorStop(1, "rgba("+d[0]+","+d[1]+","+d[2]+", 0)");
                    bB.fillStyle = wC;
                    bB.fillRect(0, 0, 256, 256);
                  }
              }
  // END --------------------------------------------------------------------------------------------------------------


  // BEG --- create color wheel 3 -------------------------------------------------------------------------------------
            if(q != "do_not_change_the_wheel_SEL_color_INV"){
                var wD = bC.createRadialGradient(128, 128, 0, 128, 128, 128);
                    wD.addColorStop(0, "rgba("+invCR+","+invCG+","+invCB+", 1)");
                    wD.addColorStop(1, "rgba("+invCR+","+invCG+","+invCB+", 0)");
                    bC.fillStyle = wD;
                    bC.fillRect(0, 0, 256, 256);
              }
  // END --------------------------------------------------------------------------------------------------------------


  // store the color values for the "maximum" saturation
            var maxΔc = Math.max(d[0], d[1], d[2]), // determine color with highest value
  // store the color values for the "minimum" saturation
                minΔc = Math.min(d[0], d[1], d[2]), // determine color with lowest value

                svR = d[0], // store selected color R
                svG = d[1], // store selected color G
                svB = d[2], // store selected color B

                vRi = 0,    // inverted color of R
                vGi = 0,    // inverted color of G
                vBi = 0;    // inverted color of B

            if (maxΔc > minΔc){
                if(d[0] == maxΔc){svR = 255;} if(d[1] == maxΔc){svG = 255;} if(d[2] == maxΔc){svB = 255;}
                if(d[0] == minΔc){svR = 0;  } if(d[1] == minΔc){svG = 0;  } if(d[2] == minΔc){svB = 0;  }
              }

            var Δc = d[0]+d[1]+d[2]-maxΔc-minΔc;

            if(d[0] != maxΔc && d[0] != minΔc){svR = Δc;}
            if(d[1] != maxΔc && d[1] != minΔc){svG = Δc;}
            if(d[2] != maxΔc && d[2] != minΔc){svB = Δc;}


  // generate the inverted RGB values
            vRi = 255-svR;
            vGi = 255-svG;
            vBi = 255-svB;

            if(greyV < 127)  { greyVdyn = (1-((1/256)*(greyV+1))).toFixed(2); }
            else             { greyVdyn = ((0.5/256)*(greyV+1)).toFixed(2);   }
            if(greyV == 255) { greyVdyn = 0; }


  // BEG --- create color Bar 1 ---------------------------------------------------------------------------------------
              if(q != "do_not_change_the_wheel_color"){
  // saturation multiplier to determine the colorBar slider

  // creating the color value for saturation and gray color
                  var wE = bD.createLinearGradient(0,0,colorBarWidth,0);
                      wE.addColorStop(0,   "rgba("+svR+", "+svG+", "+svB+", 1)");
                      wE.addColorStop(greyVdyn, "rgba("+d[0]+","+d[1]+","+d[2]+", 1)");
                      wE.addColorStop(1,   "rgba("+greyV+","+greyV+","+greyV+", 1)");
                      bD.fillStyle = wE;
                      bD.fillRect(0, 0, colorBarWidth, colorBarHeight);
                }
  // END --------------------------------------------------------------------------------------------------------------


  // BEG --- create color Bar 2 ---------------------------------------------------------------------------------------
              if(q != "do_not_change_the_wheel_brightness"){
                  var wF = bE.createLinearGradient(0, 0, colorBarWidth, 0);
                      wF.addColorStop(0, "rgba(255, 255, 255, 1)");
                      wF.addColorStop(luxCV, "rgba("+d[0]+","+d[1]+","+d[2]+", 1)");
                      wF.addColorStop(1, "rgba(0, 0, 0, 1)");
                      bE.fillStyle = wF;
                      bE.fillRect(0, 0, colorBarWidth, colorBarHeight);
                }
  // END --------------------------------------------------------------------------------------------------------------


  // BEG --- create color Bar 3 ---------------------------------------------------------------------------------------
              if(q != "do_not_change_the_wheel_rainbow"){
                  var wJ = bG.createLinearGradient(0, 0, colorBarWidth, 0);
                      bG.clearRect(0, 0, colorBarWidth, colorBarHeight);
                      wJ.addColorStop(0.1,"rgba("+d[0]+","+d[1]+","+d[2]+", 1)");
                      wJ.addColorStop(0.9,"rgba("+vRi+" ,"+vGi+" ,"+vBi+" , 1)");
                      bG.fillStyle = wJ;
                      bG.fillRect(0, 0, colorBarWidth, colorBarHeight);
                      pR.style.left = 0;
                }
  // END --------------------------------------------------------------------------------------------------------------


  // BEG --- create color Bar 4 ---------------------------------------------------------------------------------------
                  var wG = bF.createLinearGradient(0, 0, colorBarWidth, 0);
                      bF.clearRect(0, 0, colorBarWidth, colorBarHeight);
                      wG.addColorStop(0.2, "rgba("+d[0]+","+d[1]+","+d[2]+", 1)");
                      wG.addColorStop(0.8, "rgba("+d[0]+","+d[1]+","+d[2]+", 0.01)");
                      bF.fillStyle = wG;
                      bF.fillRect(0, 0, colorBarWidth, colorBarHeight);
  // END --------------------------------------------------------------------------------------------------------------

          pA.style.left = dynColorValue;

  // BEG --- set the position of the Preview color Wheel --------------------------------------------------------------
              var xBAR = Math.round(((colorBarWidth-12) /colorBarWidth)*b.x);
                  if(xBAR < 12)  { xBAR = 12; }
                  if(xBAR > (colorBarWidth-8)){ xBAR = colorBarWidth; }

              switch (sP){
                case 0:
                    pC.style.left = -1600;
                    pC.style.top  = -1600;
                  break;
                case 1:
                    pC.style.left = 254;
                    pC.style.top  = 12;
                  break;
                case 2:
                    pC.style.left = -22;
                    pC.style.top  = 12;
                  break;
                case 3:
                    pC.style.left = 530;
                    pC.style.top  = 12;
                  break;
                case 4:
                    pB.style.left = xBAR-12;
                    pC.style.left = xBAR-33;
                    pC.style.top  = 258;
                  break;
                case 5:
                    pA.style.left = xBAR-12;
                    pC.style.left = xBAR-33;
                    pC.style.top  = 310;
                  break;
                case 6:
                    var xα = Math.round(b.x);
                    if(xα < 12)  { xα = 12;  }
                    if(xα > (colorBarWidth-8)){ xα = colorBarWidth; }
                    xα = Math.round(100-((100/(colorBarWidth-12))*(xα-12)));
                     α = xα;
                    pD.style.left = xBAR-12;
                    pC.style.left = xBAR-33;
                    pC.style.top  = 414;
                  break;
                case 7:
                    pR.style.left = xBAR-12;
                    pC.style.left = xBAR-33;
                    pC.style.top  = 362;
                  break;
                default:
              }
  // END --------------------------------------------------------------------------------------------------------------


  // --- color gray control jumps to the start so that this value can be selected correctly ---------------------------
              if(sP != 4 && q != "do_not_change_the_wheel_alpha"){
                  pB.style.left =  Math.round(((colorBarWidth-24)*greyVdyn));
                  pB.style.top  = -2;
                }


  // BEG --- create color Bar 3 percent value 100% - 0% ---------------------------------------------------------------
              var wH = bF.createLinearGradient(0, 0, colorBarWidth, 0);
                  wH.addColorStop(0, "rgba(0,0,0,1)");
                  wH.addColorStop(1, "rgba(0,0,0,1)");
                  bF.fillStyle = wH;
                  bF.font = "bold 24.5px Monospace";
                  bF.fillText(Math.round(α)+"%", 376, 25);
              var wI = bF.createLinearGradient(0, 0, colorBarWidth, 0);
                  wI.addColorStop(0, "rgba(255,255,255,1)");
                  wI.addColorStop(1, "rgba(255,255,255,1)");
                  bF.fillStyle = wI;
                  bF.font = "bold 24.5px Monospace";
                  bF.fillText(Math.round(α)+"%", 375, 24);
  // END --------------------------------------------------------------------------------------------------------------

              setCWactX = b.x;
              setCWactY = b.y;

              var αV = (α/100).toFixed(2);
              if(αV == "1.00"){αV = 1;}
              if(αV == "0.00"){αV = 0;}

          pC.style.backgroundImage = "-webkit-linear-gradient(top, rgba("+d[0]+","+d[1]+","+d[2]+", "+αV+"),rgba("+d[0]+","+d[1]+","+d[2]+", "+αV+")),url('"+TB+"')";
          cF.style.backgroundImage = "-webkit-linear-gradient(top, rgba("+d[0]+","+d[1]+","+d[2]+", "+αV+"),rgba("+d[0]+","+d[1]+","+d[2]+", "+αV+")),url('"+TB+"')";
          cF.innerHTML = cF.innerHTML + " ("+α/100+")";
    }
  // END --- colorWheelSetCC ------------------------------------------------------------------------------------------


  // reset the global value for mouseDown -----------------------------------------------------------------------------
        document.body.onmouseup = function(){ mouseDown = false; };


  // BEG -- action watching for color Wheel 1 -------------------------------------------------------------------------
        aA.addEventListener("mousemove",function(at){
            sP = 1;
            if(m == true){
                sA = aA;
                colorWheelSetCC(at);
              }});

        aA.addEventListener("mousedown",function(at){
            sA = aA;
            colorWheelSetCC(at);
          });
  // END --------------------------------------------------------------------------------------------------------------


  // BEG -- action watching for color Wheel 2 -------------------------------------------------------------------------
        aB.addEventListener("mousemove",function(at){
            sP = 2;
            if(m == true){
                sA = aB;
                colorWheelSetCC(at);
              }});

        aB.addEventListener("mousedown",function(at){
            sA = aB;
            colorWheelSetCC(at,"do_not_change_the_wheel_SEL_color");
          });
  // END --------------------------------------------------------------------------------------------------------------


  // BEG -- action watching for color Wheel 3 -------------------------------------------------------------------------
        aC.addEventListener("mousemove",function(at){
            sP = 3;
            if(m == true){
                sA = aC;
                colorWheelSetCC(at);
              }});

        aC.addEventListener("mousedown",function(at){
            sA = aC;
            colorWheelSetCC(at,"do_not_change_the_wheel_SEL_color_INV");
          });
  // END --------------------------------------------------------------------------------------------------------------


  // BEG -- action watching for color Bar 1 ---------------------------------------------------------------------------
        aD.addEventListener("mousemove",function(at){
          sP = 4;
          if(m == true){
              sA = aD;
              colorWheelSetCC(at);
            }});

        aD.addEventListener("mousedown",function(at){
            sA = aD;
            colorWheelSetCC(at,"do_not_change_the_wheel_color");
          });
  // END --------------------------------------------------------------------------------------------------------------


  // BEG -- action watching for color Bar 2 ---------------------------------------------------------------------------
        aE.addEventListener("mousemove",function(at){
            sP = 5;
            if(m == true){
                sA = aE;
                colorWheelSetCC(at);
              }});

        aE.addEventListener("mousedown",function(at){
            sA = aE;
            colorWheelSetCC(at,"do_not_change_the_wheel_brightness");
          });
  // END --------------------------------------------------------------------------------------------------------------


  // BEG -- action watching for color Bar 3 ---------------------------------------------------------------------------
        aG.addEventListener("mousemove",function(at){
            sP = 7;
            if(m == true){
                sA = aG;
                colorWheelSetCC(at);
              }});

        aG.addEventListener("mousedown",function(at){
            sA = aG;
            colorWheelSetCC(at,"do_not_change_the_wheel_rainbow");
          });
  // END --------------------------------------------------------------------------------------------------------------


  // BEG -- action watching for color Bar 4 ---------------------------------------------------------------------------
        aF.addEventListener("mousemove",function(at){
            sP = 6;
            if(m == true){
                sA = aF;
                colorWheelSetCC(at);
              }});

        aF.addEventListener("mousedown",function(at){
            sA = aF;
            colorWheelSetCC(at,"do_not_change_the_wheel_alpha");
          });
  // END --------------------------------------------------------------------------------------------------------------

        addEventListener("mouseup",function(){ m = false; });

  /* BEG --- creates a color table with standard colors and pushes them into a DIV ------------------------------------
               If this DIV already contains the table, this DIV will be emptied for an ON/OFF function */
      var defaultColors = false,
          cwTable = function(a){
          ID$("cwPCb").style.top = "-10000000000000000px";
          if(!a){
              if(defaultColors == false){
                  defaultColors = true;
                }
              else {
                  defaultColors = false;
                }
            }
          var b = '<table class="cwPTable" id="cwPTable"><tr>',
              c = '<td onclick="readTDbgColor(this.id)" style="background-color:',
              d = '"id="cwTablePicR',
              e = '"></td>',
              f = '</tr><tr>',
              g = '</tr></table>';
          if(defaultColors == true){
              aH.innerHTML = b+c+"#870002;"+d+"01"+e+c+"#9d2f14;"+d+"02"+e+c+"#cf8623;"+d+"03"+e+c+"#c3b401;"+d+"04"+e+c+"#8a9c1f;"+d+"05"+e+c+"#4c8725;"+d+"06"+e+c+"#065e2a;"+d+"07"+e+c+"#036360;"+d+"08"+e+c+"#097088;"+d+"09"+e+c+"#104170;"+d+"10"+e+c+"#4b1960;"+d+"11"+e+c+"#6a1262;"+d+"12"+e+f+c+"#a20100;"+d+"13"+e+c+"#d34618;"+d+"14"+e+c+"#e39524;"+d+"15"+e+c+"#dfd401;"+d+"16"+e+c+"#9cb924;"+d+"17"+e+c+"#559a25;"+d+"18"+e+c+"#017530;"+d+"19"+e+c+"#017c7c;"+d+"20"+e+c+"#0186b9;"+d+"21"+e+c+"#144da3;"+d+"22"+e+c+"#631d7b;"+d+"23"+e+c+"#871579;"+d+"24"+e+f+c+"#ec1d26;"+d+"25"+e+c+"#e86d35;"+d+"26"+e+c+"#fbaf40;"+d+"27"+e+c+"#fff002;"+d+"28"+e+c+"#bed53a;"+d+"29"+e+c+"#66ac33;"+d+"30"+e+c+"#009346;"+d+"31"+e+c+"#00959b;"+d+"32"+e+c+"#019ce1;"+d+"33"+e+c+"#1b66bc;"+d+"34"+e+c+"#642d92;"+d+"35"+e+c+"#a1278e;"+d+"36"+e+f+c+"#ff7d7e;"+d+"37"+e+c+"#f28f6c;"+d+"38"+e+c+"#fbbf7d;"+d+"39"+e+c+"#fffa68;"+d+"40"+e+c+"#d2e256;"+d+"41"+e+c+"#87c457;"+d+"42"+e+c+"#53bd62;"+d+"43"+e+c+"#01b5b5;"+d+"44"+e+c+"#22bdf6;"+d+"45"+e+c+"#388ade;"+d+"46"+e+c+"#8c58b7;"+d+"47"+e+c+"#be49b0;"+d+"48"+e+f+c+"#ffb4b4;"+d+"49"+e+c+"#fca897;"+d+"50"+e+c+"#ffd4aa;"+d+"51"+e+c+"#ffffb9;"+d+"52"+e+c+"#ecf489;"+d+"53"+e+c+"#addc81;"+d+"54"+e+c+"#86de8e;"+d+"55"+e+c+"#51ddd4;"+d+"56"+e+c+"#85e1f9;"+d+"57"+e+c+"#83c1ea;"+d+"58"+e+c+"#b696dc;"+d+"59"+e+c+"#e081de;"+d+"60"+e+f+c+"#FFFFFF;"+d+"61"+e+c+"#E8E8E8;"+d+"62"+e+c+"#D1D1D1;"+d+"63"+e+c+"#BABABA;"+d+"64"+e+c+"#A2A2A2;"+d+"65"+e+c+"#8B8B8B;"+d+"66"+e+c+"#747474;"+d+"67"+e+c+"#5D5D5D;"+d+"68"+e+c+"#464646;"+d+"69"+e+c+"#2E2E2E;"+d+"70"+e+c+"#171717;"+d+"71"+e+c+"#000000;"+d+"72"+e+f+c+"#2863a7;"+d+"73"+e+c+"#285d9b;"+d+"74"+e+c+"#295487;"+d+"75"+e+c+"#2a4563;"+d+"76"+e+c+"#7e7064;"+d+"77"+e+c+"#b99965;"+d+"78"+e+c+"#bd8b51;"+d+"79"+e+c+"#efc066;"+d+"80"+e+c+"#813539;"+d+"81"+e+c+"#a13d40;"+d+"82"+e+c+"#c64648;"+d+"83"+e+c+"#ed5152;"+d+"84"+e+f+c+"#4a8f63;"+d+"85"+e+c+"#5e9f4e;"+d+"86"+e+c+"#89ad3e;"+d+"87"+e+c+"#acbc22;"+d+"88"+e+c+"#584a8f;"+d+"89"+e+c+"#4e6a9f;"+d+"90"+e+c+"#3e9aad;"+d+"91"+e+c+"#22bcb4;"+d+"92"+e+c+"#bbb785;"+d+"93"+e+c+"#c1a981;"+d+"94"+e+c+"#cd8173;"+d+"95"+e+c+"#e15761;"+d+"96"+e+f+c+"#953244;"+d+"97"+e+c+"#733e78;"+d+"98"+e+c+"#5c4389;"+d+"99"+e+c+"#1d4a9f;"+d+"100"+e+c+"#866d91;"+d+"101"+e+c+"#9f798a;"+d+"102"+e+c+"#be8a7e;"+d+"103"+e+c+"#d6aca6;"+d+"104"+e+c+"#e0bab5;"+d+"105"+e+c+"#efccca;"+d+"106"+e+c+"#bba09f;"+d+"107"+e+c+"#988483;"+d+"108"+e+g;
            }
          else { aH.innerHTML = ""; }
        };
  // END --------------------------------------------------------------------------------------------------------------


      dC.addEventListener("mousedown",function(at){ cwTable(); });
      cA.addEventListener("mousedown",function(at){
          ID$("cwContainer").innerHTML    = "";
          ID$("cwContainer").style.height = "1px";
          ID$("cwContainer").style.top    = "-10000px";
           α = 100;
          bR = 0;
        });


  //--- SAVE BUTTON ---------------------------------------------------------------------------------------------------
      aI.addEventListener("mousedown",function(at){
          var a = "cwPCa",
              b = ID$(a).innerHTML,
              c = b.replace(" ",",").replace(" ",",").replace(" ",",").replace("(","").replace(")",""),
              d = "rgba("+c+")",
              x = ID$("cwPButton" +bS);
          if(x){
              x.style.backgroundImage = "-webkit-linear-gradient(left, rgba(200,200,200,1) 49.00%, #000000 49.50%, #000000 50.00%, #FFFFFF 50.50%, #FFFFFF 50.75%, "+d+" 51%, "+d+" 100%, "+d+"), url('"+TB+"')";
            }
          ID$("cwPButton" +bS+ "Value").value = c;
          ID$("cwContainer").style.top    = "-10000px";
          var e = ID$("cwPButton" +bS+ "Value").value.split(',');
          if(ID$("cwPButtonRGBAr"+bS)){
              ID$("cwPButtonRGBAr"+bS).value = e[0];
              ID$("cwPButtonRGBAg"+bS).value = e[1];
              ID$("cwPButtonRGBAb"+bS).value = e[2];
              ID$("cwPButtonRGBAa"+bS).value = e[3];
            }
           α = 100;
          bR = 0;
        });


  // BEG --- apply the Blur filter for the 3 colorWheels --------------------------------------------------------------
      aA.style.filter = "blur("+vB+"px)";
      aB.style.filter = "blur("+vB+"px)";
      aC.style.filter = "blur("+vB+"px)";
  // END --------------------------------------------------------------------------------------------------------------

      sX.value = setCWactX;
      sY.value = setCWactY;

      function cwCenter(){
        if(ID$("cwContainer").innerHTML != ""){
            var a = getComputedStyle(ID$("cwContainer"), null).getPropertyValue("width").replace("px",""),
                b = getComputedStyle(ID$("cwPBOX"), null).getPropertyValue("width").replace("px",""),
                c = getComputedStyle(ID$("cwPBOX"), null).getPropertyValue("padding").replace("px",""),
                d = getComputedStyle(ID$("cwPBOX"), null).getPropertyValue("margin").replace("px",""),
                e = Math.round(((a-b)/2)-c-d);
            ID$("cwPBOX").style.left = e;
          }
        }

      window.addEventListener("resize", function(event){
          cwCenter();
        });

    colorWheelSetCC();
    cwCenter();
  }
// EOF
