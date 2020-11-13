function CheckBoxItem(props) {
    return(<li>
      <input key={props.id} type="checkbox" onClick={props.handleCheckChildElement} checked={props.isChecked} value={props.value}/>
      <label htmlFor ={props.id} > {props.value} </label>
   </li>);
};

export default CheckBoxItem;