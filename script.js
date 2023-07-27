
        function loadcategory(){
            fetch("http://fakestoreapi.com/products/categories").then(function (response){
             return response.json();
            } )
            .then(function(data){
                data.unshift("all");
                for(let category of data){
                    let option = document.createElement("option");
                    option.text = category.toUpperCase();
                    option.value=category;
                    document.getElementById("lstcategories").appendChild(option);
                }
            })

        }
        function loadproduct(url){
            document.querySelector("main").innerHTML=""; 
            fetch(url).then(function(response){
                return response.json();
            }).then( function(data){
                for(let product of data){
                    let div = document.createElement("div");
                    div.className = "card m-2 p-2";
                    div.style.width="180px";
                    div.innerHTML = `
                   <img src =${product.image} height="150" class= "card-img-top">
                   <div class ="card-header">
                 <p> ${product.title} <p>

                   </div>
                   <div class ="card-body">
                    <dl>
                        <dt>price</dt>
                        <dd>  ${product.price}</dd>
                        <dt> Rating</dt>
                        <dd> 
                            <span class = "bi bi-star-fill text-success"></span>
                            ${product.rating.rate} [${product.rating.count}]
                        </dd>
                             <dl>

                    </div>
                    <br>
                    <div class ="card-footer">
                        <button onclick ="addclick(${product.id})" class ="btn btn-danger w-100"> <span class ="bi bi-cart4"> </span>Add to cart </button>
                    </div>

                    `
                    document.querySelector("main").appendChild(div);

                }
            })
        }
        function bodyload(){
            homeload();
            loadcategory();
            loadproduct();    
         getcartcount();
                                             

        }

    function homeload(){
           
                     loadproduct("http://fakestoreapi.com/products");
            

         }
        function changecategory(){
            let categoryname =document.getElementById("lstcategories").value;
            if(categoryname=="all"){
                     loadproduct("http://fakestoreapi.com/products");
            }else{

                loadproduct(`http://fakestoreapi.com/products/category/${categoryname}`);
            }
        }

        let cartitem =[];
        function getcartcount(){
            document.getElementById("lblcount").innerHTML=cartitem.length;
        }
 function addclick(id){
    fetch(`http://fakestoreapi.com/products/${id}`)
    .then(function (response){
                                                                                               
        return response.json();
    })
.then(function(data){
    cartitem.push(data);
    alert(`${data.title} \n added to cart`);
    getcartcount();
})
    

 }

function loadcartitem(){
    document.querySelector("tbody").innerHTML=" ";
    for(let item of cartitem){
        let tr= document.createElement("tr");
        let tdtitle = document.createElement("td");
        let tdprice=document.createElement("td");
        let tdpreview = document.createElement("td");

        tdtitle.innerHTML = item.title;
        tdprice.innerHTML = item.price;
        tdpreview.innerHTML = `<img src =${item.image} width="50" height="50"> `

        tr.appendChild(tdtitle);
        tr.appendChild(tdprice);
        tr.appendChild(tdpreview);

        document.querySelector("tbody").appendChild(tr);

    }
}
    

   








        