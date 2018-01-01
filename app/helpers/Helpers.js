export function diffDate(system_date){
	let dates = new Date().getDate() ;
  	let date = new Date().getDate() ;
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    let date_today = `${month}/${dates}/${year}`;
    let diff = new Date(date_today) - new Date(system_date);
	let timeDiff = Math.abs(diff);
	let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
	return diffDays;
}