function fetchIssues(){
    const list=document.getElementById('issuesList')
    list.innerHTML=''
    const issues=JSON.parse(localStorage.issues)
    for(const issue of issues){
        const id=issue.id
        const description=issue.description
        const severity=issue.severity
        const assignedTo=issue.assignedTo
        const istatus=issue.istatus
        let currentStatus=''
        issue.istatus==='Open'?currentStatus='Close':currentStatus='Open'
        list.innerHTML+=`
        <div class="well">
        <h6>Issue ID: ${id}</h6>
        <p><span class="label label-info">${istatus}</span></p>
        <h3>${description}</h3>
        <p><span class="glyphicon glyphicon-time">${severity}</span>
        <span class="glyphicon glyphicon-user"></span>${assignedTo}</p>
        <a href="#" class="btn btn-warning" onclick=toggleStatus(${id}) id="statusButton">${currentStatus}</a> 
        <a href="#" class="btn btn-danger" onclick="deleteIssue(${id})">Delete</a>
        </div>
        `
    }
}
document.getElementById("issueInputForm").addEventListener('submit',saveIssue)
function saveIssue(e){
    const [id,istatus,description,severity,assignedTo]=
    [Date.now(),'Open',document.getElementById('issueDescInput').value,document.getElementById('issueSeverityInput').value,document.getElementById('issueAssignedToInput').value]
    const issue={
        id,
        description,
        severity,
        assignedTo,
        istatus
    }
    if(localStorage.issues){
        const issues=JSON.parse(localStorage.issues)
        issues.push(issue)
        localStorage.setItem('issues',JSON.stringify(issues))
    }else{
        const issues =[]
        issues.push(issue)
        localStorage.setItem('issues',JSON.stringify(issues))
    }
    e.preventDefault()
    document.getElementById("issueInputForm").reset()
    fetchIssues()
}
function toggleStatus(id){
    const issues = JSON.parse(localStorage.issues)
    for(let issue of issues){
        if(issue.istatus==='Open'){
            issue.istatus='Closed'
            
        }else if(issue.istatus==='Closed'){
            issue.istatus='Open'
        }
    }
    localStorage.setItem('issues',JSON.stringify(issues))
    fetchIssues()
}
function deleteIssue(id){
    const issues = JSON.parse(localStorage.issues).filter((issue)=>{
        return issue.id!==id
    })
    localStorage.setItem('issues',JSON.stringify(issues))
    fetchIssues()
}