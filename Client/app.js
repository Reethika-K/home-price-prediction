const data_columns = {
    "places" :  ["1st block jayanagar", "1st phase jp nagar", "2nd phase judicial layout", "2nd stage nagarbhavi", "5th block hbr layout", "5th phase jp nagar", "6th phase jp nagar", "7th phase jp nagar", "8th phase jp nagar", "9th phase jp nagar", "aecs layout", "abbigere", "akshaya nagar", "ambalipura", "ambedkar nagar", "amruthahalli", "anandapura", "ananth nagar", "anekal", "anjanapura", "ardendale", "arekere", "attibele", "beml layout", "btm 2nd stage", "btm layout", "babusapalaya", "badavala nagar", "balagere", "banashankari", "banashankari stage ii", "banashankari stage iii", "banashankari stage v", "banashankari stage vi", "banaswadi", "banjara layout", "bannerghatta", "bannerghatta road", "basavangudi", "basaveshwara nagar", "battarahalli", "begur", "begur road", "bellandur", "benson town", "bharathi nagar", "bhoganhalli", "billekahalli", "binny pete", "bisuvanahalli", "bommanahalli", "bommasandra", "bommasandra industrial area", "bommenahalli", "brookefield", "budigere", "cv raman nagar", "chamrajpet", "chandapura", "channasandra", "chikka tirupathi", "chikkabanavar", "chikkalasandra", "choodasandra", "cooke town", "cox town", "cunningham road", "dasanapura", "dasarahalli", "devanahalli", "devarachikkanahalli", "dodda nekkundi", "doddaballapur", "doddakallasandra", "doddathoguru", "domlur", "dommasandra", "epip zone", "electronic city", "electronic city phase ii", "electronics city phase 1", "frazer town", "gm palaya", "garudachar palya", "giri nagar", "gollarapalya hosahalli", "gottigere", "green glen layout", "gubbalala", "gunjur", "hal 2nd stage", "hbr layout", "hrbr layout", "hsr layout", "haralur road", "harlur", "hebbal", "hebbal kempapura", "hegde nagar", "hennur", "hennur road", "hoodi", "horamavu agara", "horamavu banaswadi", "hormavu", "hosa road", "hosakerehalli", "hoskote", "hosur road", "hulimavu", "isro layout", "itpl", "iblur village", "indira nagar", "jp nagar", "jakkur", "jalahalli", "jalahalli east", "jigani", "judicial layout", "kr puram", "kadubeesanahalli", "kadugodi", "kaggadasapura", "kaggalipura", "kaikondrahalli", "kalena agrahara", "kalyan nagar", "kambipura", "kammanahalli", "kammasandra", "kanakapura", "kanakpura road", "kannamangala", "karuna nagar", "kasavanhalli", "kasturi nagar", "kathriguppe", "kaval byrasandra", "kenchenahalli", "kengeri", "kengeri satellite town", "kereguddadahalli", "kodichikkanahalli", "kodigehaali", "kodigehalli", "kodihalli", "kogilu", "konanakunte", "koramangala", "kothannur", "kothanur", "kudlu", "kudlu gate", "kumaraswami layout", "kundalahalli", "lb shastri nagar", "laggere", "lakshminarayana pura", "lingadheeranahalli", "magadi road", "mahadevpura", "mahalakshmi layout", "mallasandra", "malleshpalya", "malleshwaram", "marathahalli", "margondanahalli", "marsur", "mico layout", "munnekollal", "murugeshpalya", "mysore road", "ngr layout", "nri layout", "nagarbhavi", "nagasandra", "nagavara", "nagavarapalya", "narayanapura", "neeladri nagar", "nehru nagar", "ombr layout", "old airport road", "old madras road", "padmanabhanagar", "pai layout", "panathur", "parappana agrahara", "pattandur agrahara", "poorna pragna layout", "prithvi layout", "r.t. nagar", "rachenahalli", "raja rajeshwari nagar", "rajaji nagar", "rajiv nagar", "ramagondanahalli", "ramamurthy nagar", "rayasandra", "sahakara nagar", "sanjay nagar", "sarakki nagar", "sarjapur", "sarjapur  road", "sarjapura - attibele road", "sector 2 hsr layout", "sector 7 hsr layout", "seegehalli", "shampura", "shivaji nagar", "singasandra", "somasundara palya", "sompura", "sonnenahalli", "subramanyapura", "sultan palaya", "tc palaya", "talaghattapura", "thanisandra", "thigalarapalya", "thubarahalli", "thyagaraja nagar", "tindlu", "tumkur road", "ulsoor", "uttarahalli", "varthur", "varthur road", "vasanthapura", "vidyaranyapura", "vijayanagar", "vishveshwarya layout", "vishwapriya layout", "vittasandra", "whitefield", "yelachenahalli", "yelahanka", "yelahanka new town", "yelenahalli", "yeshwanthpur"]
};

let locations=document.querySelector(".locnames");
let areaval=document.querySelector(".areavalue");
let bhkval=document.querySelectorAll(".bhkbut");
let bathval=document.querySelectorAll(".bathbut");
let estimatebut=document.querySelector(".Estimate_price");
let output=document.querySelector(".output")

let area=0;
let loc="";
let bhk=0;
let bath=0;

data_columns.places.forEach(option =>{
    let newOption = document.createElement("option");
    newOption.textContent = option;
    newOption.value = option;
    locations.appendChild(newOption);
})

areaval.addEventListener("input",(e)=>{
    area=e.target.value;
})

locations.addEventListener("change",(e)=>{
    loc=e.target.value;
})

bhkval.forEach(button=>{
    button.addEventListener("click",()=>{
        let x= parseInt(button.textContent);
        bhk=x;
    })
})

bathval.forEach(button=>{
    button.addEventListener("click",()=>{
        let x= parseInt(button.textContent);
        bath=x;
    })
})

estimatebut.addEventListener("click", () => {
    console.log(area)
    console.log(bhk)
    console.log(bath)
    console.log(loc)
    if (!loc || !area || !bhk || !bath) {
        alert("Please enter all values");
        return;
    }

    var url = "http://127.0.0.1:5000/predict_home_price";
    $.ajax({
        url: url,
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
            total_sqft: parseFloat(area),
            bhk: bhk,
            bath: bath,
            location: loc
        }),
        success: function (data) {
            console.log(data.estimated_price);
            output.innerHTML = "Rs " + data.estimated_price + "lakhs";
        },
        error: function (xhr, status, error) {
            console.log("Error:", error);
            alert("Something went wrong! Check the console.");
        }
    });
});


function onPageLoad(){
    console.log("doc loaded");
    var url="http://127.0.0.1:5000/get_loc_names";

    $.get(url,function(data,status){
        console.log("got response for get loc names request");
        if(data && data.locations){
            locations.innerHTML="";
            data.locations.forEach(option =>{
                let newOption = document.createElement("option");
                newOption.textContent = option;
                newOption.value = option;
                locations.appendChild(newOption);
            });
        }
            
    });
}

















