let allCells = document.getElementsByClassName("cell"); //HTML Collection
let allCellsArray = Array.from(allCells); //HTMLCollection'ı Array'e Dönüştürme
let allImages = document.querySelectorAll(".cell2 img");
let pieceSection = document.querySelector(".parcalar");
let selected;
let firstChar;
let tag;
let puzzleCompleted = false;

    for(let img of allImages)
    {
        img.addEventListener("dragstart",function(e){
            
            if(puzzleCompleted){
             return;
            }

            selected = e.target;
            firstChar = e.target.getAttribute("data-tag");

            pieceSection.addEventListener("dragover",function(e){
            e.preventDefault();
            })

            pieceSection.addEventListener("drop",function(e){
                pieceSection.appendChild(selected);
                
                selected = null;
            })

            for(let cell of allCells)
            {
                cell.addEventListener("dragover",function(e){
                    e.preventDefault();
                    /*e.target.innerHTML = ""; ifadesi, hücrelerin içeriğini her sürükleme işlemi sırasında temizleyerek, 
                    eski resimlerin hücrede kalmasını engelliyor. Bu da allCellsArray dizisinin doğru şekilde
                        güncellenmesini sağlıyor*/
                })

                cell.addEventListener("drop",function(e){

                    /*ÜZERİNDE ZATEN RESİM OLAN DİV'E BAŞKA BİR RESİM SÜRÜKLEMEYİ ENGELLEME*/
                    if (cell.children.length > 0) {
                        return;
                    } 
                    
                    /*Eğer bir return ifadesi bir fonksiyonun içinde çağrılırsa,
                    o fonksiyonun geri kalan kısmı çalıştırılmadan fonksiyondan çıkılır.*/

                    /*cell.children.length: Bu ifade, cell elementinin kaç tane doğrudan çocuk elemanı olduğunu döner.
                    Eğer length 0'dan büyükse, bu, cell elementinin içinde en az bir eleman (örneğin, bir resim)
                    olduğu anlamına gelir.*/
                    

                    index= Number(cell.getAttribute("tag"));
                    allCellsArray[index] = Number(firstChar);
                    
                    cell.appendChild(selected);
                    selected = null;
                    control();
                })
            }   
        }) 
    }


    function control()
    {
        let sum = 0;
        for(let i=0; i<6; i++){
            
            if(allCellsArray[i] === i)
            {
                sum += 1; 
                console.log(sum);
            }
            
        }   
        
        if(sum === 6)
        {

            puzzleCompleted = true;

            let title = document.createElement("h1");
            title.classList.add("title");
            title.textContent = "GREAT JOB!";

            pieceSection.style.display = "flex";
            pieceSection.style.justifyContent = "center";
            pieceSection.style.alignItems = "center";     

            pieceSection.appendChild(title);
        }

    }