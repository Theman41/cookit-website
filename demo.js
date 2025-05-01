// Demo interaction states
let demoState = {
    isScanning: false,
    recognizedIngredients: [],
    currentRecipe: null,
    step: 0
};

const ingredients = [
    { name: 'Tomatoes', confidence: 0.98, position: { x: 120, y: 150 } },
    { name: 'Onions', confidence: 0.96, position: { x: 250, y: 180 } },
    { name: 'Bell Peppers', confidence: 0.95, position: { x: 180, y: 220 } },
    { name: 'Garlic', confidence: 0.97, position: { x: 300, y: 160 } }
];

const sampleRecipe = {
    name: "Mediterranean Vegetable Stir-Fry",
    ingredients: [
        "2 medium tomatoes",
        "1 large onion",
        "2 bell peppers",
        "3 cloves of garlic",
        "2 tbsp olive oil",
        "Salt and pepper to taste"
    ],
    steps: [
        "Dice tomatoes, onions, and bell peppers",
        "Mince garlic cloves",
        "Heat olive oil in a large pan",
        "Sauté garlic and onions until fragrant",
        "Add bell peppers and cook for 3 minutes",
        "Add tomatoes and seasonings",
        "Cook for 5-7 minutes until vegetables are tender"
    ]
};

function startScanning() {
    demoState.isScanning = true;
    const scanner = document.getElementById('ai-scanner');
    scanner.classList.add('scanning');
    
    document.getElementById('start-scan').disabled = true;
    
    setTimeout(() => {
        showRecognizedIngredients();
    }, 2000);
}

function showRecognizedIngredients() {
    demoState.isScanning = false;
    demoState.recognizedIngredients = ingredients;
    
    const scanner = document.getElementById('ai-scanner');
    scanner.classList.remove('scanning');
    
    ingredients.forEach((ingredient, index) => {
        setTimeout(() => {
            const marker = document.createElement('div');
            marker.className = 'ingredient-marker';
            marker.style.left = `${ingredient.position.x}px`;
            marker.style.top = `${ingredient.position.y}px`;
            marker.innerHTML = `
                <div class="marker-dot"></div>
                <div class="marker-label">
                    ${ingredient.name}
                    <span class="confidence">${(ingredient.confidence * 100).toFixed(0)}%</span>
                </div>
            `;
            scanner.appendChild(marker);
            
            if (index === ingredients.length - 1) {
                setTimeout(() => {
                    document.getElementById('generate-recipe').classList.remove('hidden');
                }, 500);
            }
        }, index * 300);
    });
}

function generateRecipe() {
    demoState.currentRecipe = sampleRecipe;
    
    const recipeCard = document.getElementById('recipe-card');
    recipeCard.classList.remove('hidden');
    recipeCard.classList.add('slide-in');
    
    document.getElementById('recipe-name').textContent = sampleRecipe.name;
    
    const ingredientsList = document.getElementById('recipe-ingredients');
    ingredientsList.innerHTML = sampleRecipe.ingredients
        .map(ing => `<li class="mb-1">${ing}</li>`)
        .join('');
        
    const stepsList = document.getElementById('recipe-steps');
    stepsList.innerHTML = sampleRecipe.steps
        .map(step => `<li class="mb-2">${step}</li>`)
        .join('');
    
    document.getElementById('start-ar').classList.remove('hidden');
    document.getElementById('generate-recipe').disabled = true;
}

function startARMode() {
    const demoContainer = document.getElementById('demo-container');
    demoContainer.classList.add('ar-mode');
    
    document.getElementById('prev-step').classList.remove('hidden');
    document.getElementById('next-step').classList.remove('hidden');
    document.getElementById('start-ar').disabled = true;
    
    document.getElementById('ar-overlay').classList.remove('hidden');
    showARStep(0);
}

function showARStep(stepIndex) {
    if (!demoState.currentRecipe) return;
    
    demoState.step = stepIndex;
    const step = demoState.currentRecipe.steps[stepIndex];
    
    const arOverlay = document.getElementById('ar-overlay');
    arOverlay.innerHTML = `
        <div class="ar-step">
            <div class="step-number">Step ${stepIndex + 1}</div>
            <div class="step-instruction">${step}</div>
        </div>
    `;
    
    const progress = ((stepIndex + 1) / demoState.currentRecipe.steps.length) * 100;
    document.getElementById('ar-progress').style.width = `${progress}%`;
    
    document.getElementById('prev-step').disabled = stepIndex === 0;
    document.getElementById('next-step').disabled = stepIndex === demoState.currentRecipe.steps.length - 1;
}

function nextStep() {
    if (demoState.step < demoState.currentRecipe.steps.length - 1) {
        showARStep(demoState.step + 1);
    }
}

function previousStep() {
    if (demoState.step > 0) {
        showARStep(demoState.step - 1);
    }
}
