import { Input } from 'antd';
import './Filter.scss';

type Props = {}

const Filter = ({ }: Props) => {
  return (
    <div className='filter-container'>
      <span className='label'>Location</span>
      <Input className='filter-text-input' placeholder="Location" />
      <span className='label'>Modality</span>
      <Input className='filter-text-input' placeholder="Modality" />
      <span className='label'>Machine</span>
      <Input className='filter-text-input' placeholder="Machine" />
      <div className='button-container'>
        <span className='button btn-search'>Search</span>
        <span className='button btn-clear'>Clear</span>
      </div>
    </div>
  );
};

export default Filter;
