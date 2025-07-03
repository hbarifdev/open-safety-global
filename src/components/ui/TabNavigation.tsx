import React from 'react';
import { useDispatch } from 'react-redux';
import { setActiveTab } from '../../store/slices/uiSlice';

interface Tab {
  id: string;
  label: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ tabs, activeTab }) => {
  const dispatch = useDispatch();
  
  const handleTabClick = (tabId: string) => {
    dispatch(setActiveTab(tabId));
  };
  
 return (
  <div className="flex border-b border-gray-300 overflow-x-auto whitespace-nowrap">
    {tabs.map(tab => (
      <button
        key={tab.id}
        className={`py-3 px-4 sm:px-6 md:px-8 text-center font-medium text-sm transition-colors flex-shrink-0
        ${
          activeTab === tab.id 
            ? 'border-b-2 border-blue-600 text-blue-600' 
            : 'text-gray-600 hover:text-gray-900 hover:border-b-2 hover:border-gray-300'
        }`}
        onClick={() => handleTabClick(tab.id)}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

};

export default TabNavigation;