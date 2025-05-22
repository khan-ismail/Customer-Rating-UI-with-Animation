import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useRef, useCallback } from 'react';

// Main App component
function App() {
  // Sample insights data
  const insightsData = [
    {
      id: 1,
      text: "1/5: Health Insurance recorded the lowest average agent rating of 1.2 on 250 calls",
      serviceGroup: "Health Insurance",
      kpi: "Average Agent Rating"
    },
    {
      id: 2,
      text: "Short statement that fits.",
      serviceGroup: "General Service",
      kpi: "Response Time"
    },
    {
      id: 3,
      text: "Another normal statement that should fit comfortably within the bar.",
      serviceGroup: "Customer Support",
      kpi: "Resolution Rate"
    },
    {
      id: 4,
      text: "This is a very long statement that will definitely overflow the ticker bar and require scrolling to be fully visible to the user.",
      serviceGroup: "Technical Support",
      kpi: "First Contact Resolution"
    },
    {
      id: 5,
      text: "A statement that is just long enough to cause a slight overflow, testing the scroll threshold.",
      serviceGroup: "Billing Department",
      kpi: "Billing Accuracy"
    }
  ];

  // State for the expanded view modal
  const [isExpandedViewOpen, setIsExpandedViewOpen] = useState(false);
  const [highlightedInsightId, setHighlightedInsightId] = useState(null);

  // Function to open the expanded view modal
  const openExpandedView = (insightId) => {
    setIsExpandedViewOpen(true);
    setHighlightedInsightId(insightId);
  };

  // Function to close the expanded view modal
  const closeExpandedView = () => {
    setIsExpandedViewOpen(false);
    setHighlightedInsightId(null);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 font-inter">
      {/* Customer Ratings Card */}
      <CustomerRatingsCard />

      {/* Insights Ticker Bar */}
      <InsightsTickerBar
        insights={insightsData}
        openExpandedView={openExpandedView}
      />

      {/* Expanded View Modal */}
      {isExpandedViewOpen && (
        <ExpandedViewModal
          insights={insightsData}
          closeModal={closeExpandedView}
          highlightedInsightId={highlightedInsightId}
        />
      )}
    </div>
  );
}

// Customer Ratings Card Component
function CustomerRatingsCard() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Customer Ratings</h2>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-gray-500 cursor-pointer">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center border-b pb-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">Average Service Rating</p>
          <div className="flex items-center justify-center mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-green-500 mr-1">
              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.292-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.006Z" clipRule="evenodd" />
            </svg>
            <span className="text-2xl font-bold text-gray-800">4.2</span>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Number of Ratings</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">482</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Target Rating</p>
          <div className="flex items-center justify-center mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-blue-500 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 5.942 8.657 1 15.875 1h.007a.75.75 0 0 1 .75.75v3.125a.75.75 0 0 1-.75.75h-.007a8.625 8.625 0 0 0-8.618 8.618v.007a.75.75 0 0 1-.75.75H3.75a.75.75 0 0 1-.75-.75v-.007Zm-.75 0h.007C3.75 20.058 9.343 25 15.875 25h.007a.75.75 0 0 0 .75-.75v-3.125a.75.75 0 0 0-.75-.75h-.007a8.625 8.625 0 0 1-8.618-8.618v-.007a.75.75 0 0 0-.75-.75H2.25a.75.75 0 0 0-.75.75v.007Z" />
            </svg>
            <span className="text-2xl font-bold text-gray-800">4.0</span>
          </div>
        </div>
      </div>

      {/* Rating breakdown */}
      {[5, 4, 3, 2, 1, 0].map((rating, index) => (
        <div key={rating} className="flex items-center mb-2">
          <div className="w-12 flex items-center justify-end mr-2">
            {rating > 0 ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-5 h-5 ${rating >= 4 ? 'text-green-500' : rating === 3 ? 'text-yellow-500' : 'text-red-500'}`}>
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.292-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.006Z" clipRule="evenodd" />
            </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            )}
            <span className="ml-1 text-gray-700">{rating > 0 ? rating : '-'}</span>
          </div>
          <div className="flex-1 bg-gray-200 rounded-full h-2.5 mr-2">
            <div
              className={`h-2.5 rounded-full ${rating === 5 ? 'bg-green-500' : rating === 4 ? 'bg-purple-500' : rating === 3 ? 'bg-purple-500' : rating === 2 ? 'bg-red-500' : rating === 1 ? 'bg-red-500' : 'bg-gray-400'}`}
              style={{ width: `${rating === 5 ? 22 : rating === 4 ? 53 : rating === 3 ? 18 : rating === 2 ? 4 : rating === 1 ? 3 : 0}%` }}
            ></div>
          </div>
          <span className="text-sm text-gray-600 w-24 text-right">
            {rating === 5 && '22% (106 calls)'}
            {rating === 4 && '53% (255 calls)'}
            {rating === 3 && '18% (87 calls)'}
            {rating === 2 && '4% (19 calls)'}
            {rating === 1 && '3% (14 calls)'}
            {rating === 0 && '0% (0 calls)'}
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-gray-500 ml-2 cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      ))}
    </div>
  );
}

// Insights Ticker Bar Component
function InsightsTickerBar({ insights, openExpandedView }) {
  const [currentInsightIndex, setCurrentInsightIndex] = useState(0);
  const [animationState, setAnimationState] = useState('fade-in'); // 'fade-in', 'static', 'scrolling', 'fade-out'
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentScrollDuration, setCurrentScrollDuration] = useState('0s'); // State for dynamic scroll duration, initialized to 0
  const [currentOpacity, setCurrentOpacity] = useState(0); // Managed explicitly
  const [currentBlur, setCurrentBlur] = useState('blur(4px)'); // Managed explicitly
  const [isOpacityBlurTransitionEnabled, setIsOpacityBlurTransitionEnabled] = useState(false); // Controls opacity/blur transition

  const insightRef = useRef(null); // Ref for the actual text element
  const containerRef = useRef(null); // Ref for the outer ticker bar container
  const animationTimeoutRef = useRef(null);

  const currentInsight = insights[currentInsightIndex];

  // Function to handle the next insight in the loop
  const goToNextInsight = useCallback(() => {
    setCurrentInsightIndex((prevIndex) => (prevIndex + 1) % insights.length);
    setAnimationState('fade-in'); // Start next insight with fade-in
    setScrollPosition(0); // Reset scroll position for the new insight
    // On going to next insight, ensure it starts faded and blurred
    setCurrentOpacity(0);
    setCurrentBlur('blur(4px)');
  }, [insights.length]);

  useEffect(() => {
    const insightElement = insightRef.current;
    const outerBarElement = containerRef.current;
    const textContainerElement = outerBarElement.querySelector('.relative.flex-grow.h-6.overflow-hidden');

    if (!insightElement || !outerBarElement || !textContainerElement) return;

    const insightWidth = insightElement.scrollWidth;
    const containerWidth = textContainerElement.clientWidth;
    const isOverflowing = insightWidth > containerWidth;

    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    if (animationState === 'fade-in') {
      setIsOpacityBlurTransitionEnabled(true); // Enable transition for opacity and blur
      setCurrentOpacity(1); // Target opacity
      setCurrentBlur('blur(0px)'); // Target blur
      setCurrentScrollDuration('0s'); // Transform should not transition here

      animationTimeoutRef.current = setTimeout(() => {
        setIsOpacityBlurTransitionEnabled(false); // Disable transition after fade-in completes
        if (isOverflowing) {
          setAnimationState('static');
        } else {
          setAnimationState('static-long');
        }
      }, 600); // Slightly longer than CSS transition to ensure completion
    } else if (animationState === 'static') {
      setIsOpacityBlurTransitionEnabled(false); // Ensure no transition on opacity/blur
      setCurrentOpacity(1); // Ensure it's fully visible
      setCurrentBlur('blur(0px)'); // Ensure no blur
      setCurrentScrollDuration('0s'); // Transform should not transition here

      animationTimeoutRef.current = setTimeout(() => {
        setAnimationState('scrolling');
      }, 4000);
    } else if (animationState === 'static-long') {
      setIsOpacityBlurTransitionEnabled(false); // Ensure no transition on opacity/blur
      setCurrentOpacity(1); // Ensure it's fully visible
      setCurrentBlur('blur(0px)'); // Ensure no blur
      setCurrentScrollDuration('0s'); // Transform should not transition here

      animationTimeoutRef.current = setTimeout(() => {
        setAnimationState('fade-out');
      }, 10000);
    } else if (animationState === 'scrolling') {
      setIsOpacityBlurTransitionEnabled(false); // Ensure no transition on opacity/blur
      setCurrentOpacity(1); // Ensure it's fully visible during scroll
      setCurrentBlur('blur(0px)'); // Ensure no blur during scroll

      const totalDistanceToExit = insightWidth + 20;
      const calculatedDuration = totalDistanceToExit * 25; // Adjusted speed: 25ms per pixel (faster)

      setCurrentScrollDuration(`${calculatedDuration}ms`); // Transform transitions here
      setScrollPosition(-totalDistanceToExit); // Set final scroll position

      animationTimeoutRef.current = setTimeout(() => {
        setAnimationState('fade-out');
      }, calculatedDuration); // Wait for scroll animation to complete
    } else if (animationState === 'fade-out') {
      setIsOpacityBlurTransitionEnabled(true); // Enable transition for opacity and blur
      setCurrentOpacity(0); // Target opacity
      setCurrentBlur('blur(4px)'); // Target blur
      setCurrentScrollDuration('0s'); // Transform should not transition here

      animationTimeoutRef.current = setTimeout(() => {
        goToNextInsight();
      }, 500); // Wait for fade-out to complete
    }

    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [animationState, currentInsightIndex, goToNextInsight, insights.length]); // Dependencies for useEffect

  // Handle click on the ticker insight
  const handleInsightClick = (event) => {
    const serviceGroupSpan = event.target.closest('.service-group-name');
    if (serviceGroupSpan) {
      const serviceGroupName = serviceGroupSpan.textContent;
      window.open(`/csat-dashboard?serviceGroup=${encodeURIComponent(serviceGroupName)}&dateRange=selected`, '_blank');
    } else {
      openExpandedView(currentInsight.id);
    }
  };

  return (
    <div
      ref={containerRef}
      // className="relative w-full max-w-2xl bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-xl shadow-lg p-4 overflow-hidden cursor-pointer flex items-center"
      className="w-[616px] h-[42px] bg-[#F7F7F7] pt-2 pb-2 px-1 gap-2 border-t flex items-center"
      onClick={handleInsightClick}
    >
      <div className="flex-shrink-0 mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </div>
      <div className="relative flex-grow h-6 overflow-hidden">
        <div
          ref={insightRef}
          className="absolute whitespace-nowrap"
          style={{
            transform: `translateX(${scrollPosition}px)`,
            opacity: currentOpacity,
            filter: currentBlur,
            // Dynamically set transition property based on state
            transition: `
              transform ${currentScrollDuration} ${animationState === 'scrolling' ? 'linear' : ''},
              opacity ${isOpacityBlurTransitionEnabled ? '500ms ease-in-out' : '0s'},
              filter ${isOpacityBlurTransitionEnabled ? '500ms ease-in-out' : '0s'}
            `.replace(/\s+/g, ' ').trim(),
          }}
        >
          {currentInsight && (
            <>
              <span className="font-bold mr-1">{currentInsight.id}/{insights.length}:</span>
              <span className="service-group-name font-semibold underline cursor-pointer hover:text-blue-200">
                {currentInsight.serviceGroup}
              </span>
              <span> {currentInsight.text.substring(currentInsight.text.indexOf(':') + 1)}</span>
            </>
          )}
        </div>
      </div>
      <div className="flex-shrink-0 ml-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 16.5h-4.5m4.5 0v-4.5m0 4.5L15 15" />
        </svg>
      </div>
    </div>
  );
}

// Expanded View Modal Component
function ExpandedViewModal({ insights, closeModal, highlightedInsightId }) {
  const modalRef = useRef(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeModal]);

  // Handle click on an insight within the modal
  const handleInsightClick = (insight) => {
    // Open CSAT Dashboard in a new tab with pre-applied filters
    // In a real application, you'd construct the URL with insight.serviceGroup and date range
    window.open(`/csat-dashboard?serviceGroup=${encodeURIComponent(insight.serviceGroup)}&dateRange=selected&kpi=${encodeURIComponent(insight.kpi)}`, '_blank');
    closeModal(); // Close modal after opening dashboard
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div ref={modalRef} className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center pb-4 border-b mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Customer Rating Insights for Service Group</h3>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto flex-grow pr-2"> {/* Added pr-2 for scrollbar */}
          {insights.map((insight, index) => (
            <div
              key={insight.id}
              className={`flex items-start p-3 rounded-lg mb-2 cursor-pointer transition-colors duration-200
                ${highlightedInsightId === insight.id ? 'bg-blue-100 border border-blue-300' : 'hover:bg-gray-50'}`}
              onClick={() => handleInsightClick(insight)}
            >
              <span className="font-bold text-gray-700 mr-2">{index + 1}/{insights.length}:</span>
              <p className="text-gray-800 flex-grow">
                <span className="font-semibold text-blue-600 underline hover:text-blue-800">
                  {insight.serviceGroup}
                </span>
                <span> {insight.text.substring(insight.text.indexOf(':') + 1)}</span>
              </p>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-gray-500 ml-2 flex-shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
