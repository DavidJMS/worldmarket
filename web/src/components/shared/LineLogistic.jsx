import PageLoading from "./PageLoading";
import { Line } from 'react-chartjs-2';

function LineLogistic(props){
    if(!props.shopping || !props.sales){
        return <PageLoading />
    }
    const data = {
        labels: ['Enero', 'Febrero', 'Marzo','Abril', 'Mayo',"Junio","Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        datasets: [
            {
                label: 'Ventas',
                data: props.sales,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.2
            },
            {
                label: 'Compras',
                data: props.shopping,
                fill: false,
                borderColor: 'rgb(239, 71, 111)',
                tension: 0.2
            }
        ]
    }
    return <Line data={data}/>
}

export default LineLogistic;