'use client';

import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-auto bg-white text-gray-800 p-6 shadow-inner border-t-gray-200 border-t-2 bottom-0 w-full">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-lg font-semibold">&copy; 2024 El Hejjioui Youssef. All rights reserved.</p>
          <p className="text-gray-400 pr-4">Empowering secure and efficient websites services with cutting-edge technologies.</p>
        </div>
        <div>
        
        <div className="flex  space-x-3 ml-auto mb-4 ">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 6.042 4.432 11.063 10.225 11.917v-8.429H7.078v-3.488h3.147V9.334c0-3.118 1.87-4.826 4.742-4.826 1.374 0 2.81.246 2.81.246v3.098H15.95c-1.486 0-1.947.926-1.947 1.872v2.243h3.445l-.55 3.488h-2.895v8.429C19.568 23.136 24 18.115 24 12.073z"/></svg>
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.611 1.798-1.574 2.165-2.724-.951.555-2.005.959-3.127 1.184-.896-.954-2.173-1.55-3.591-1.55-2.717 0-4.92 2.204-4.92 4.92 0 .386.044.762.127 1.124C7.728 8.087 4.1 6.128 1.67 3.149c-.422.724-.664 1.561-.664 2.475 0 1.708.869 3.216 2.19 4.099-.807-.026-1.566-.247-2.228-.616v.062c0 2.385 1.698 4.374 3.95 4.827-.413.111-.849.171-1.296.171-.317 0-.626-.031-.927-.088.626 1.955 2.444 3.377 4.6 3.416-1.68 1.318-3.808 2.104-6.115 2.104-.397 0-.788-.023-1.174-.068C2.32 19.138 5.075 20 8.034 20c9.642 0 14.91-7.993 14.91-14.91 0-.228-.005-.456-.015-.682.998-.72 1.866-1.62 2.553-2.645z"/></svg>
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.73c-1.14 0-2.07-.93-2.07-2.07 0-1.14.93-2.07 2.07-2.07s2.07.93 2.07 2.07c0 1.14-.93 2.07-2.07 2.07zm14.35 12.72h-3.56V14.6c0-1.39-.02-3.18-1.94-3.18-1.94 0-2.24 1.51-2.24 3.07v6h-3.56V9h3.42v1.56h.05c.48-.91 1.64-1.87 3.37-1.87 3.6 0 4.27 2.37 4.27 5.45v6.31z"/></svg>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.056 1.97.24 2.424.403.608.218 1.043.48 1.505.942.462.462.724.897.942 1.505.163.455.347 1.255.403 2.424.058 1.267.07 1.647.07 4.851 0 3.204-.012 3.584-.07 4.85-.056 1.17-.24 1.97-.403 2.424-.218.608-.48 1.043-.942 1.505-.462.462-.897.724-1.505.942-.455.163-1.255.347-2.424.403-1.267.058-1.647.07-4.85.07-3.204 0-3.584-.012-4.85-.07-1.17-.056-1.97-.24-2.424-.403-.608-.218-1.043-.48-1.505-.942-.462-.462-.724-.897-.942-1.505-.163-.455-.347-1.255-.403-2.424-.058-1.267-.07-1.647-.07-4.85 0-3.204.012-3.584.07-4.85.056-1.17.24-1.97.403-2.424.218-.608.48-1.043.942-1.505.462-.462.897-.724 1.505-.942.455-.163 1.255-.347 2.424-.403 1.267-.058 1.647-.07 4.85-.07zm0-2.163c-3.258 0-3.667.013-4.947.072-1.265.058-2.138.242-2.89.518-.783.286-1.45.678-2.109 1.337-.66.66-1.051 1.326-1.337 2.109-.276.752-.46 1.625-.518 2.89-.059 1.28-.072 1.689-.072 4.947s.013 3.667.072 4.947c.058 1.265.242 2.138.518 2.89.286.783.678 1.45 1.337 2.109.66.66 1.326 1.051 2.109 1.337.752.276 1.625.46 2.89.518 1.28.059 1.689.072 4.947.072s3.667-.013 4.947-.072c1.265-.058 2.138-.242 2.89-.518.783-.286 1.45-.678 2.109-1.337.66-.66 1.051-1.326 1.337-2.109.276-.752.46-1.625.518-2.89.059-1.28.072-1.689.072-4.947s-.013-3.667-.072-4.947c-.058-1.265-.242-2.138-.518-2.89-.286-.783-.678-1.45-1.337-2.109-.66-.66-1.326-1.051-2.109-1.337-.752-.276-1.625-.46-2.89-.518-1.28-.059-1.689-.072-4.947-.072zM12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.124c-2.188 0-3.962-1.774-3.962-3.962s1.774-3.962 3.962-3.962 3.962 1.774 3.962 3.962-1.774 3.962-3.962 3.962zm7.406-11.845c-.796 0-1.442.646-1.442 1.442s.646 1.442 1.442 1.442 1.442-.646 1.442-1.442-.646-1.442-1.442-1.442z"/></svg>
          </a>
        </div>
        <div className="flex space-x-2 mb-2 md:mb-0">
          <a href="/privacy" className="text-gray-400 hover:text-gray-600 transition-colors">Privacy Policy</a>
          <a href="/terms" className="text-gray-400 hover:text-gray-600 transition-colors">Terms of Service</a>
          <a href="/contact" className="text-gray-400 hover:text-gray-600 transition-colors">Contact Us</a>
        </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;



