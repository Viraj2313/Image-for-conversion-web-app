const inputFile = document.querySelector("#inputFile")
const imgV=document.querySelector("#imgV")
const convertBtn=document.querySelector("#convertBtn")
const selectFormat=document.querySelector("#selectFormat")
const downloadLink =document.querySelector("#downloadLink")


inputFile.addEventListener("change",()=>{
    const file=inputFile.files[0]
    const reader = new FileReader()

    reader.addEventListener("load", ()=>{
        console.log("read successful ");
        imgV.src=reader.result
        imgV.style.display ='block'
    })
    reader.readAsDataURL(file)

    convertBtn.addEventListener('click',()=>{
        const canvas = document.createElement("canvas")
        const ctx=canvas.getContext("2d")
        const img = new Image()
        img.src = imgV.src

        img.onload=()=>{
            canvas.height=img.height
            canvas.width=img.width
            ctx.drawImage(img,0,0)
            const selectedFormat= selectFormat.value
            canvas.toBlob(blob=>{
                const newFile = new Blob([blob],{type:`image/${selectedFormat}`})
                const url= URL.createObjectURL(newFile)
                downloadLink.href=url
                downloadLink.download=`converted-img.${selectedFormat}`
                downloadLink.style.display='inline'

            },`image/${selectedFormat}`)
        }

    })

    
})