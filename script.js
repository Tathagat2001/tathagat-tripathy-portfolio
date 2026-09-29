const data={
 users:{title:"Enterprise reach",insight:"Enterprise dashboards supporting global business units.",values:[35,48,56,74,88],labels:["Q1","Q2","Q3","Q4","Current"]},
 refresh:{title:"Refresh optimization",insight:"Documented report refresh-time reduction after performance optimization.",values:[20,34,47,62,82],labels:["Baseline","DAX","Model","Agg.","Optimized"]},
 automation:{title:"Workflow automation",insight:"Power Query and SQL automation reduced manual data preparation workflows.",values:[12,28,43,67,90],labels:["Start","Design","Build","Deploy","Automated"]},
 adoption:{title:"User adoption",insight:"Core analytics product adoption increased within the first two months.",values:[18,32,49,66,87],labels:["Launch","W1","W2","W4","Month 2"]}
};
const chartTitle=document.getElementById("chartTitle"), insight=document.getElementById("chartInsight"), select=document.getElementById("chartSelect"), line=document.getElementById("line"), area=document.getElementById("area"), points=document.getElementById("points"), xAxis=document.querySelector(".x-axis");
function draw(key){
 const d=data[key], w=700,h=230,p=12;
 chartTitle.textContent=d.title; insight.textContent=d.insight;
 xAxis.innerHTML=d.labels.map(x=>`<span>${x}</span>`).join("");
 const pts=d.values.map((v,i)=>[p+(i*(w-p*2)/(d.values.length-1)),h-p-(v/100)*(h-p*2)]);
 const lineD=pts.map((q,i)=>(i?"L":"M")+q[0]+" "+q[1]).join(" ");
 line.setAttribute("d",lineD);
 area.setAttribute("d",lineD+` L ${pts.at(-1)[0]} ${h-p} L ${pts[0][0]} ${h-p} Z`);
 points.innerHTML=pts.map(q=>`<circle cx="${q[0]}" cy="${q[1]}" r="4" fill="#b8f36b" stroke="#101513" stroke-width="3"/>`).join("");
 document.querySelectorAll(".kpi-card").forEach(b=>b.classList.toggle("active",b.dataset.kpi===key));
}
select.addEventListener("change",e=>draw(e.target.value));
document.querySelectorAll(".kpi-card").forEach(b=>b.addEventListener("click",()=>{select.value=b.dataset.kpi;draw(b.dataset.kpi)}));
draw("users");

const detail=document.getElementById("projectDetail");
const projectCopy={
 "AI Agent & Ticket Management Automation":{focus:"AI · Python · ServiceNow",body:"Built an AI-driven agent in Python to parse system logs, automatically route incident tickets and detect SLA breaches in real time.",result:"75% reduction in manual effort · Sapphire Award — Innovation Hackathon"},
 "OBIEE Security & Filter Validation":{focus:"Python · OBIEE · Governance",body:"Scripted an automated validation system to audit application roles and security filters across analytic environments.",result:"90% reduction in admin effort · 55% cost reduction · Improved data governance and security"}
};
document.querySelectorAll(".project-row").forEach(row=>row.addEventListener("click",()=>{
 const title=row.querySelector("h3").textContent,c=projectCopy[title];
 detail.innerHTML=`<span class="overline">${c.focus}</span><h3>${title}</h3><p>${c.body} <strong style="color:#b8f36b">${c.result}</strong></p>`;
 detail.scrollIntoView({behavior:"smooth",block:"nearest"});
}));
document.querySelectorAll(".filter").forEach(btn=>btn.addEventListener("click",()=>{
 document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));btn.classList.add("active");
 const f=btn.dataset.filter;
 document.querySelectorAll(".project-row").forEach(row=>row.style.display=(f==="all"||row.dataset.tags.includes(f))?"grid":"none");
}));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("seen");io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll(".impact-card,.stack-card,.project-row,.timeline article,.credential-grid article").forEach(e=>io.observe(e));
document.getElementById("year").textContent=new Date().getFullYear();
