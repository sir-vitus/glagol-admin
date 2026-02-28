import Accordion from 'ui-component/extended/Accordion';
export default function PerformersAccordion({data}) {
  const getShowContent = (item) => <div>{item.name}</div>
  const getAccData = () => data.map((item, idx) => { return{title: item.name, id: idx, content:getShowContent(item)}}) 
    return (<Accordion data={getAccData()} toggle={true}></Accordion>)
}