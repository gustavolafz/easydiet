import Script from 'next/script';

export const RecipeStructuredData = ({ recipe }) => {
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Recipe",
    "name": recipe.title,
    "description": recipe.description,
    "datePublished": recipe.createdAt,
    "nutrition": {
      "@type": "NutritionInformation",
      "calories": `${recipe.totalCalories} calories`,
      "proteinContent": `${recipe.totalProtein}g`,
      "carbohydrateContent": `${recipe.totalCarbs}g`,
      "fatContent": `${recipe.totalFat}g`,
    },
    "recipeIngredient": recipe.ingredients.map(ing => 
      `${ing.quantity} ${ing.unit} ${ing.name}`
    ),
  };

  return (
    <Script
      id={`recipe-structured-data-${recipe.id}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export const WebsiteStructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "EasyDiet",
    "url": "https://easydiet.com",
    "description": "Aplicativo de gerenciamento de dietas e nutrição personalizada",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL"
    },
    "creator": {
      "@type": "Organization",
      "name": "EasyDiet Team",
      "url": "https://easydiet.com"
    }
  };

  return (
    <Script
      id="website-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export const BreadcrumbStructuredData = ({ items }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <Script
      id="breadcrumb-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}; 