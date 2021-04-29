import React from 'react';
import '../assets/styles/App.scss';
import '../assets/styles/styles.scss';
const App = ()=> {

  return (
    <>
      <h1>Typography: Poppins</h1>
      <div className='Typography-div'>
        <p className='Typography-title'>Display Large</p>
        <p className='Typography-info'>64px / 66px / 1px / Regular</p>
        <span className='Typography-text-DL'>
          The future is in our hands to shape.
        </span>
      </div>
      <div className='Typography-div'>
        <p className='Typography-title'>Display Large Bold</p>
        <p className='Typography-info'>64px / 66px / 1px / Bold</p>
        <span className='Typography-text-DLB'>
          The future is in our hands to shape.
        </span>
      </div>
      <div className='Typography-div'>
        <p className='Typography-title'>Display Medium</p>
        <p className='Typography-info'>48px / 50px / 1px / Regular</p>
        <span className='Typography-text-DM'>
          The future is in our hands to shape.
        </span>
      </div>
      <div className='Typography-div'>
        <p className='Typography-title'>Display Medium Bold</p>
        <p className='Typography-info'>48px / 50px / 1px / Bold</p>
        <span className='Typography-text-DMB'>
          The future is in our hands to shape.
        </span>
      </div>
      <div className='Typography-div'>
        <p className='Typography-title'>Display Small</p>
        <p className='Typography-info'>32px / 34px / 1px / Regular</p>
        <span className='Typography-text-DS'>
          The future is in our hands to shape.
        </span>
      </div>
      <div className='Typography-div'>
        <p className='Typography-title'>Display Small Bold</p>
        <p className='Typography-info'>32px / 34px / 1px / Bold</p>
        <span className='Typography-text-DSB'>
          The future is in our hands to shape.
        </span>
      </div>
      <div className='Typography-div'>
        <p className='Typography-title'>Text Large</p>
        <p className='Typography-info'>24px / 38px / 0.75px / Regular</p>
        <span className='Typography-text-TL'>
          The future is in our hands to shape.
        </span>
      </div>
      <div className='Typography-div'>
        <p className='Typography-title'>Link Large</p>
        <p className='Typography-info'>24px / 38px / 0.75px / Semi-Bold</p>
        <span className='Typography-text-LL'>
          The future is in our hands to shape.
        </span>
      </div>
      <div className='Typography-div'>
        <p className='Typography-title'>Text Medium</p>
        <p className='Typography-info'>18px / 34px / 0.75px / Regular</p>
        <span className='Typography-text-TM'>
          The future is in our hands to shape.
        </span>
      </div>
      <div className='Typography-div'>
        <p className='Typography-title'>Link Medium</p>
        <p className='Typography-info'>18px / 34px / 0.75px / Semi-Bold</p>
        <span className='Typography-text-LM'>
          The future is in our hands to shape.
        </span>
      </div>
      <div className='Typography-div'>
        <p className='Typography-title'>Text Small</p>
        <p className='Typography-info'>16px / 28px / 0.75px / Regular</p>
        <span className='Typography-text-TS'>
          The future is in our hands to shape.
        </span>
      </div>
      <div className='Typography-div'>
        <p className='Typography-title'>Link Small</p>
        <p className='Typography-info'>16px / 28px / 0.75px / Semi-Bold</p>
        <span className='Typography-text-LS'>
          The future is in our hands to shape.
        </span>
      </div>
      <div className='Typography-div'>
        <p className='Typography-title'>Text X-Small</p>
        <p className='Typography-info'>14px / 24px / 0.75px / Regular</p>
        <span className='Typography-text-TXS'>
          The future is in our hands to shape.
        </span>
      </div>
      <div className='Typography-div'>
        <p className='Typography-title'>Link X-Small</p>
        <p className='Typography-info'>14px / 24px / 0.75px / Semi-Bold</p>
        <span className='Typography-text-LXS'>
          The future is in our hands to shape.
        </span>
      </div>

      <div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Primary</th>
              <th>Secondary</th>
              <th>SubTie</th>
              <th>Text</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                Initial
              </th>
              <td>
                <button className='btn-primary'>button</button>
              </td>
              <td>
                <button className='btn-secondary'>button</button>
              </td>
              <td>
                <button className='btn-subtie'>button</button>
              </td>
              <td>
                <button className='btn-text'>button</button>
              </td>
            </tr>
            <tr>
              <th>
                Loading
              </th>
              <td>
                <button className='btn-primary-loading'>
                  <div className='loading-spinner' />
                </button>
              </td>
              <td>
                <button className='btn-secondary-loading'>
                  <div className='loading-spinner' />
                </button>
              </td>
              <td>
                <button className='btn-subtie-loading'>
                  <div className='loading-spinner' />
                </button>
              </td>
              <td>
                <button className='btn-text-loading'>loading</button>
              </td>
            </tr>
            <tr>
              <th>
                Disable
              </th>
              <td>
                <button className='btn-primary' disabled >button</button>
              </td>
              <td>
                <button className='btn-secondary' disabled>button</button>
              </td>
              <td>
                <button className='btn-subtie' disabled>button</button>
              </td>
              <td>
                <button className='btn-text' disabled>button</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <h1>Input</h1>

        <div className='Forms-div'>
          <h2>Large</h2>
          <table>
            <thead>
              <tr>
                <th> </th>
                <th>Primary</th>
                <th>Secondary</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  Initial
                </th>
                <td>
                  <div className='input-text'>
                    <input type='text' id='input-text' placeholder='Phone Number'/>
                    <label htmlFor='input-text' >Phone Number</label>
                  </div>
                </td>
                <td>
                  <input type='text' className='input-text' placeholder='Phone Number'/>
                </td>
              </tr>
              <tr>
                <th>
                  Disabled
                </th>
                <td>
                  <div className='input-text'>
                    <input type='text' id='input-text-d' disabled placeholder='Phone Number'/>
                    <label htmlFor='input-text-d' >Phone Number</label>
                  </div>
                </td>
                <td>
                  <input type='text' className='input-text-disabled' disabled placeholder='Phone Number'/>
                </td>
              </tr>
              <tr>
                <th>
                  Success
                </th>
                <td>
                  <div className='input-text-success'>
                    <input type='text' id='input-text-s' placeholder='Phone Number'/>
                    <label htmlFor='input-text-s' >Phone Number</label>
                  </div>
                </td>
                <td>
                  <input type='text' className='input-text-success' placeholder='Phone Number'/>
                </td>
              </tr>
              <tr>
                <th>
                  Error
                </th>
                <td>
                  <div className='input-text-error'>
                    <input type='text' id='input-text-e' placeholder='Phone Number'/>
                    <label htmlFor='input-text-e' >Phone Number</label>
                  </div>
                </td>
                <td>
                  <input type='text' className='input-text-error' placeholder='Phone Number'/>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default App;
