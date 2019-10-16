/* eslint-disable import/no-extraneous-dependencies */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Set up enzyme for dom testing
configure({ adapter: new Adapter() });
