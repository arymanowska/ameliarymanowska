export default function Namelist({imie, ok}){

  var classnames = ""
  if(ok){
    classnames="border w-1/2 bg-green-500"
  }else{
    classnames="border w-1/2"
  }
    return(
        <div className={classnames}>
      <h1 className="text-pink-400">{imie}</h1>
      </div>
    )
}


