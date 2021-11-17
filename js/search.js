/**
 * @param {string} loupe url du svg loupe
 */
export default class Search{
	constructor(loupe){
		this.loupe = loupe
	}
	render(){
		const search=
    `
    <section class="search">
      <input
        id="search"
        type="text"
        placeholder="Rechercher un ingrédient, appareil, ustensiles ou une recette"
      />
      <img class="loupe" src="${this.loupe}" alt="loupe de recherche" />
    </section>
    `
		return search
   
	}
}