const seedAds=[
{id:"demo-1",title:"[DEMO] Samsung Galaxy S24",category:"Electronics",price:"PKR 220,000",country:"Pakistan",city:"Karachi",description:"DEMO SAMPLE LISTING — Not a real advertisement."},
{id:"demo-2",title:"[DEMO] Toyota Corolla 2022",category:"Vehicles",price:"PKR 6,250,000",country:"Pakistan",city:"Lahore",description:"DEMO SAMPLE LISTING — Not a real advertisement."},
{id:"demo-3",title:"[DEMO] 2 Bedroom Apartment",category:"Property",price:"AED 95,000/year",country:"UAE",city:"Dubai",description:"DEMO SAMPLE LISTING — Not a real advertisement."},
{id:"demo-4",title:"[DEMO] Luxury Stainless Steel Watch",category:"Fashion",price:"SAR 450",country:"Saudi Arabia",city:"Riyadh",description:"DEMO SAMPLE LISTING — Not a real advertisement."},
{id:"demo-5",title:"[DEMO] Digital Marketing Service",category:"Services",price:"GBP 500",country:"UK",city:"London",description:"DEMO SAMPLE LISTING — Not a real advertisement."}
];
let ads=JSON.parse(localStorage.getItem("faw_ads")||"null")||seedAds;

const icons={Electronics:"📱",Vehicles:"🚗",Property:"🏠",Fashion:"⌚",Services:"💼",Jobs:"💼",Home:"🛋️",Other:"📦"};

function renderAds(){
 const q=(document.getElementById("searchInput")?.value||"").toLowerCase().trim();
 const country=document.getElementById("countryFilter")?.value||"";
 const filtered=ads.filter(a=>(!q||`${a.title} ${a.description} ${a.category} ${a.city}`.toLowerCase().includes(q))&&(!country||a.country===country));
 const grid=document.getElementById("adsGrid"), empty=document.getElementById("emptyState");
 grid.innerHTML=filtered.map(ad=>`<article class="ad-card" onclick="openAd('${ad.id}')"><div class="ad-img">${icons[ad.category]||"📦"}</div><div class="ad-body"><span class="tag">${ad.category}</span><h3>${escapeHtml(ad.title)}</h3><div class="price">${escapeHtml(ad.price||"Price on request")}</div><div class="ad-meta">📍 ${escapeHtml(ad.city)}, ${escapeHtml(ad.country)}</div></div></article>`).join("");
 empty.hidden=filtered.length>0;
}
function openAd(id){
 const ad=ads.find(x=>x.id===id); if(!ad)return;
 const url=`${location.origin}${location.pathname}#ad=${encodeURIComponent(id)}`;
 document.title=`${ad.title} — FreeAdWorld`;
 const text=`${ad.title}\n${ad.price||"Price on request"}\n${ad.city}, ${ad.country}\n${ad.description}`;
 if(navigator.share){navigator.share({title:ad.title,text,url}).catch(()=>{});}else{navigator.clipboard?.writeText(`${text}\n${url}`);alert("Ad link copied to clipboard.");}
}
function filterCategory(category){document.getElementById("searchInput").value=category;location.hash="browse";renderAds();document.getElementById("browse").scrollIntoView({behavior:"smooth"});}
function clearFilters(){document.getElementById("searchInput").value="";document.getElementById("countryFilter").value="";renderAds();}
function openPostModal(){document.getElementById("modal").hidden=false}
function closePostModal(){document.getElementById("modal").hidden=true}
function submitAd(e){
 e.preventDefault();
 const ad={id:"local-"+Date.now(),title:document.getElementById("adTitle").value,category:document.getElementById("adCategory").value,price:document.getElementById("adPrice").value||"Price on request",country:document.getElementById("adCountry").value,city:document.getElementById("adCity").value,description:document.getElementById("adDescription").value};
 ads=[ad,...ads];localStorage.setItem("faw_ads",JSON.stringify(ads));closePostModal();e.target.reset();renderAds();document.getElementById("browse").scrollIntoView({behavior:"smooth"});alert("Your ad was published in demo mode.");
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
renderAds();