// import closeKeyword from './closeKeyword.js'
// import filterByTag from './filterByTag.js'
import Recipe from './recipe.js'
import generateKeyword from './generateKeyword.js'
//***********************************fonction de filtre des ing, app et ust ********/
/**
 * 
 * @param {Array} arrayOfRecipes tableau de recettes 
 * @param {Array} arrayOfFilteredRecipes tableau des recettes ayant subit un filterByTag
 *
 */
let filteredRecipesBySearchBar // recettes filtrées par la barre de recherche
let arrayOfFilteredRecipes
let filteredRecipesBy1Tag
let filteredRecipesBy2Tag
let filteredRecipesBy3Tag
let filteredRecipesBy4Tag

export const filterIngAppUst = (arrayOfRecipes) =>{
	if(arrayOfTagsLength == 0){
		filteredRecipesBySearchBar = arrayOfRecipes
	}	

	const ingredientsContainer = document.querySelector('.ingredients__container')
	const appliancesContainer = document.querySelector('.appliances__container')
	const ustensilesContainer = document.querySelector('.ustensiles__container')
	ingredientsContainer.innerHTML = ''
	appliancesContainer.innerHTML= ''
	ustensilesContainer.innerHTML= ''
	let ingredientsFilter = []
	let appliancesFilter = []
	let ustensilesFilter = []
	for(const recipe of arrayOfRecipes){
		for(const el of recipe.ingredients){
			ingredientsFilter.push(el.ingredient.toLowerCase())
		}
		appliancesFilter.push(recipe.appliance.toLowerCase())
		for(const el of recipe.ustensils){
			ustensilesFilter.push(el.toLowerCase())
		}		
	}
	//supression des doublons
	let setIngredientsFilter = [...new Set(ingredientsFilter.sort())]
	let setAppliancesFilter = [...new Set(appliancesFilter.sort())]	
	let setUstensilesFilter = [...new Set(ustensilesFilter.sort())]
	// génération des spans filtrés
	for(const el of setIngredientsFilter){
		ingredientsContainer.innerHTML += `<span  class="list list__ingredients">${el}</span>`

	}
	for(const el of setAppliancesFilter){
		appliancesContainer.innerHTML+= `<span class="list list__appliances">${el}</span>`
	}
	for(const el of setUstensilesFilter){
		ustensilesContainer.innerHTML += `<span class="list list__ustensiles">${el}</span>`
	}
	// ajout d'un event listener sur les tags 
	const tags = document.querySelectorAll('.list')
	for(const tag of tags){
		tag.addEventListener('click', (e)=>{
			createArrayOfTag(arrayOfRecipes,e)
			//ajout d'un event listener sur la croix de fermeture des tags				
			const closeBtns = document.querySelectorAll('.croix')
			closeBtns.forEach(el => el.addEventListener('click', (e)=> {
				closeKeyword(e)
				
			}))
		})
	
	}


}

let arrayOfTags=[] // tableau des tags sur lesquels on a clické
let arrayOfTagsLength = 0 // initialisation du nombre de tags sélectionnés
let valueOfTag ='' // value du tag quand on click sur close
/**
 * @param {Event} e 
 * @param {Array} arrayOfRecipes 
 */
function createArrayOfTag(arrayOfRecipes,e){
	const inputsOfAvancedSearch = document.querySelectorAll('.input')
	const tagsInDivKeyword = document.querySelectorAll('.userChoice')
	arrayOfTags= []
	valueOfTag =	e.target.innerHTML.toLowerCase() // récupére le contenu textuel du tag 
	let tagIsInDivkeyword
	if(!arrayOfTags.includes(valueOfTag)){
		arrayOfTags.push(valueOfTag)
		arrayOfTagsLength++
		tagsInDivKeyword.forEach(tag => {
			tagIsInDivkeyword = tag.children[0].innerHTML==valueOfTag
		})
		if(tagIsInDivkeyword){
			alert('vous avez déjà selectionné ce tag')
		}
		else if(tagIsInDivkeyword==undefined){
			generateKeyword(e)			
		}
		else{
			generateKeyword(e)			

		}
		inputsOfAvancedSearch.forEach(el=> el.value='')//vide le champ de recherche avancé lors de la sélection d'un tag
	} 
	filterByTag(arrayOfRecipes,arrayOfTags)
} 
/**
 * 
 * @param {Object} filteredRecipesByTag tableau de recettes filtrées (par barre de recherche ou par tag)
 * @param {Object} arrayOfTags tableau des tags sélectionnés
 * @param {Object} arrayOfRecipesToRender tableau de recettes triées a afficher
 */

function filterByTag(filteredRecipesByTag,arrayOfTags){	

	let container = document.querySelector('.container')
	let arrayOfRecipesToRender=[]
	for(const recipe of filteredRecipesByTag){	
		for(const tag of arrayOfTags){

			for(const el of recipe.ingredients){
				if(el.ingredient.toLowerCase().match(tag))
					arrayOfRecipesToRender.push(recipe)
					
			}	
			if(recipe.appliance.toLowerCase().match(tag)){
				arrayOfRecipesToRender.push(recipe)
			}
			for(const el of recipe.ustensils){
				if(el.toLowerCase().match(tag)){
					arrayOfRecipesToRender.push(recipe)
				}
			}
		}
	}
		
	arrayOfFilteredRecipes = [...new Set(arrayOfRecipesToRender)]
	container.innerHTML = ''
	for(const recipe of arrayOfFilteredRecipes){
		container.innerHTML += new Recipe(recipe).render()
	}	

	if(arrayOfTagsLength==1){
		filteredRecipesBy1Tag = arrayOfFilteredRecipes
		filterIngAppUst(filteredRecipesBy1Tag)
	}
	if(arrayOfTagsLength == 2){
		filteredRecipesBy2Tag = arrayOfFilteredRecipes
		filterIngAppUst(filteredRecipesBy2Tag)
	}
	
	if(arrayOfTagsLength == 3){
		filteredRecipesBy3Tag = arrayOfFilteredRecipes
		filterIngAppUst(filteredRecipesBy3Tag)
	}
	
	if(arrayOfTagsLength == 4){
		filteredRecipesBy4Tag = arrayOfFilteredRecipes
		filterIngAppUst(filteredRecipesBy4Tag)
	}
	
	
}
export {filteredRecipesBy1Tag,filteredRecipesBy2Tag,filteredRecipesBy3Tag,filteredRecipesBy4Tag}
/****************************************************************Supression d'un tag au click sur la croix********************************/
/**
 * 
 * @param {Event} e 
 * @param {string} valueOfTag contenu du tag qu'on veut fermer
 * 
 */
function closeKeyword(e,valueOfTag){
	let container = document.querySelector('.container')
	valueOfTag = e.target.parentElement.children[0].innerHTML.toLowerCase()	
	let index = arrayOfTags.indexOf(valueOfTag)
	arrayOfTags.splice(index,1)
	arrayOfTagsLength--
	if(arrayOfTagsLength == 0){	
		container.innerHTML = ''
		for(const recipe of filteredRecipesBySearchBar){
			container.innerHTML += new Recipe(recipe).render()
		}	
		filterIngAppUst(filteredRecipesBySearchBar)
	}
	if(arrayOfTagsLength == 1){	
		container.innerHTML = ''
		for(const recipe of filteredRecipesBy1Tag){
			container.innerHTML += new Recipe(recipe).render()
		}	
		filterIngAppUst(filteredRecipesBy1Tag)
	}
	if(arrayOfTagsLength == 2){	
		container.innerHTML = ''
		for(const recipe of filteredRecipesBy2Tag){
			container.innerHTML += new Recipe(recipe).render()
		}	
		filterIngAppUst(filteredRecipesBy2Tag)
	}
	
	if(arrayOfTagsLength == 3){	
		container.innerHTML = ''
		for(const recipe of filteredRecipesBy3Tag){
			container.innerHTML += new Recipe(recipe).render()
		}	
		filterIngAppUst(filteredRecipesBy3Tag)
	}
	
	e.target.parentElement.remove(e.target)
	
}

export {createArrayOfTag}
export{closeKeyword}