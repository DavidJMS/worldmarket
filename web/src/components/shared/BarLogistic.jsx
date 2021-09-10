import PageLoading from "./PageLoading";
import MiniLoader from "./MiniLoader";
import { Bar } from 'react-chartjs-2';

function BarLogistic(props){
  if(props.loading1 == true && !props.dataShopping || props.loading2 == true && !props.dataSales){
    return <MiniLoader />
  }
  const dataShoppingValues = props.dataShopping.map(element =>{
    return element.quantity
  });
  const dataShoppingNames = props.dataShopping.map(element =>{
    return element.name
  });
  const dataSalesValues = props.dataSales.map(element =>{
    return element.quantity
  });
  const dataSalesNames = props.dataSales.map(element =>{
    return element.name
  });
  const data = {
      labels: dataShoppingNames,
      datasets: [
        {
          label: 'Compras',
          data: dataShoppingValues,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 99, 132)',
          ],
          borderWidth: 3
      },
      {
        label: 'Ventas',
        data: dataSalesValues,
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgb(75, 192, 192)',
        ],
        borderWidth: 3
      }],
  }
  return <Bar data={data}/>
}

export default BarLogistic;