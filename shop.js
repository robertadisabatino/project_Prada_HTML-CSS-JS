

document.addEventListener("DOMContentLoaded", () => {
    fetch("./Annunci.json")
    .then((response) => response.json())
    .then((data) => {
        
        data.forEach(item => {
            item.price = Number(item.price);
        });
        
        let categoryWrapper = document.querySelector("#categoryWrapper");
        let cardWrapper = document.querySelector("#cardWrapper");
        
        
        function setCategoryFilter(){
            
            let categories = data.map((product)=> product.category);
            
            let singleCategory = [];
            
            categories.forEach((category)=> {
                if(!singleCategory.includes(category)) {
                    singleCategory.push(category)
                }
                
            });
            
            singleCategory.forEach((category)=> {
                
                let div = document.createElement("div");
                div.classList.add("form-check");
                div.innerHTML= `
                        <input class="form-check-input radioCategory" type="radio" name="category" id="${category}" >
                        <label class="form-check-label" for="${category}">
                        ${category}
                        </label>
            `
                
                categoryWrapper.appendChild(div);
                
            });
            
            let radios = document.querySelectorAll(".radioCategory");
            
            radios.forEach((button)=> {
                button.addEventListener("click", ()=> {
                    globalFilter();
                })
            })
            
        }
        setCategoryFilter();
        
        
        function showCards(array) {
            cardWrapper.innerHTML="";
            array.sort((a , b) => a.price - b.price);
            
            array.forEach((annuncio)=>{
                let div = document.createElement("div");
                div.classList.add( "card-custom");
                div.innerHTML=`
            
                    <img src="${annuncio.image}" class="card-img-top img-fluid card-img-custom" alt="...">
                    <div class="card-body card-body-custom text-center">
                        <h5 class="card-title">${annuncio.name}</h5>
                        <p class="card-text">$ ${annuncio.price}</p>
                    </div>
            
            
            `
                cardWrapper.appendChild(div)
            })
        }
        
        showCards(data);
        
        console.table(data);
        
        
        //.find() - trova il primo elemento con la caratteristica checked, se non lo trova restituisce undefined;
        //array.from() - trasforma una nodelist in un array
        
        // input categoria
        function filterBycategory(array){
            
            let radios = document.querySelectorAll(".radioCategory");
            
            let checked = Array.from(radios).find((button)=> button.checked );
            
            
                let categoria = checked ? checked.id : "all";
            
            
            if (categoria != "all"){
                let filtered = array.filter(annuncio => annuncio.category == categoria);
                return filtered
            }else {
                return array
            }
            
        }
        
        
        
        
        // input colore 
        
        
        let colorWrapper = document.querySelector("#colorWrapper");
        
        function setColorFilter(){
            let colors = data.map((product)=> product.color);
            
            let singleColor = [];
            
            colors.forEach((color)=> {
                if(!singleColor.includes(color)) {
                    singleColor.push(color)
                }
            });
            
            
            singleColor.forEach((color)=> {
                let div = document.createElement("div");
                div.classList.add("form-check" );
                div.innerHTML= `
    
            <input class="form-check-input colorCheckbox " type="checkbox" name="color" id="${color}" aria-label="..." >
            
            `;
                colorWrapper.appendChild(div);
            })
            
            let colorCheckbox = document.querySelectorAll(".colorCheckbox");
            
            colorCheckbox.forEach((button) => {
                button.addEventListener("click", ()=> {
                    globalFilter();
                })
            })
        }
        
        setColorFilter();
        
        
        function filterByColor(array) {
            let checkboxes = document.querySelectorAll(".colorCheckbox");
            let checkedColors = Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.id);
            
            if (checkedColors.length === 0) {
                return array; // nessun filtro attivo, ritorna l'intero array
            }
            
            let filtered = array.filter((annuncio) => checkedColors.includes(annuncio.color));
            return filtered;
        }
        
        
        
        // input prezzo
        let priceInput = document.querySelector("#priceInput")
        let priceNumber = document.querySelector("#priceNumber")
        
        function setPriceInput(){
            
            
            let sorted = [...data].sort((a, b) => a.price - b.price);
            let minPrice = sorted[0].price;
            let maxPrice = sorted[sorted.length - 1].price;
            
            priceInput.min = minPrice;
            priceInput.max = maxPrice;
            priceInput.value = maxPrice;
            priceNumber.innerHTML = maxPrice;
            
            
        }
        
        setPriceInput();
        
        priceInput.addEventListener("input", ()=> {
            priceNumber.innerHTML= priceInput.value;
            
            globalFilter();
        })
        
        // posso scrivere Number. oppure +, al posto di Number()
        function filterByPrice(array){
            let filtered = array.filter((annuncio)=> Number(annuncio.price) <= Number(priceInput.value));
            
            return filtered
        }
        
        
        
        
        // input materiale
        
        let materialInput = document.querySelector("#materialInput")
        
        materialInput.addEventListener("input", ()=>{
            globalFilter();
            
        })
        
        
        function filterByMaterial(array) {
            let filtered = array.filter((annuncio)=> annuncio.material.toLowerCase().includes(materialInput.value.toLowerCase()));
            return filtered
        }
        
        
        
        
        
        
        // input parola nella searchbar
        
        let wordInput = document.querySelector("#wordInput")
        
        wordInput.addEventListener("input", ()=>{
            filterByword();
            
        })
        
        
        function filterByword() {
            let filtered = data.filter((annuncio)=> annuncio.name.toLowerCase().includes(wordInput.value.toLowerCase()));
            showCards(filtered);
        }
        
        
        console.log("Data loaded", data);
        console.log("Categoria wrapper", categoryWrapper);
        console.log("Color wrapper", colorWrapper);
        console.log("Card wrapper", cardWrapper);
        console.log("Material input", materialInput);
        console.log("Price input", priceInput);
        console.log("Word input", wordInput);
        
        
        
        
        
        // filtro generico - concatenazione di quelli precedenti
        
        function globalFilter() {
            console.log(" globalFilter CHIAMATA");
            let filterCategory = filterBycategory(data);
            let filterPrice = filterByPrice(filterCategory);
            let filterMaterial = filterByMaterial(filterPrice);
            let filterColor = filterByColor(filterMaterial);
            showCards(filterColor);
        }
        
    })
});

