//Three props are :
//options → List of categories.
//selected → The currently selected category.
//onSelect → Function called when a category is selected.
//
const CategoryFilter = ({ options, selected, onSelect }) => {

  //return ( :"The return statement defines the user interface that React renders."
  return (

    //"This is the container that holds all category buttons."
    <div className="flex flex-wrap gap-2">
{/* 
      //"The map() method loops through every category
      // in the options array and creates one button for each category." */}
      {options.map((option) => {

        {/* //"This checks whether the current category is the selected one."
        const isActive = option === selected; */}
        return (
          <button
          //The key prop gives each button a unique identity.
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${isActive ? 'bg-primary-400 text-dark-900' : 'border border-dark-200 bg-white text-dark-700 hover:border-primary-300'}`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
