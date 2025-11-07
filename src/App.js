import React from 'react';
import Header from './Header';
import Home from './Home';  // وارد کردن صفحه اصلی

function App() {
  return (
    <div>
      <Header />
      <Home />  {/* نمایش صفحه اصلی */}
    </div>
  );
}

export default App;
