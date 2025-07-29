#!/bin/bash

# Create the areas directory if it doesn't exist
mkdir -p public/images/areas

# Function to convert area name to filename
to_filename() {
    echo "$1" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr -d "'," | sed 's/ñ/n/g' | sed 's/á/a/g' | sed 's/é/e/g' | sed 's/í/i/g' | sed 's/ó/o/g' | sed 's/ú/u/g'
}

# Function to get province color
get_province_color() {
    case "$1" in
        "Malaga") echo "3B82F6";;  # Blue
        "Cordoba") echo "22C55E";; # Green
        "Granada") echo "A855F7";; # Purple
        "Jaen") echo "F97316";;    # Orange
        "Sevilla") echo "EF4444";; # Red
        *) echo "6B7280";;         # Default gray
    esac
}

# Function to URL encode text
urlencode() {
    local string="$1"
    echo "$string" | sed 's/ /%20/g'
}

# Array of areas and their provinces
areas=(
    "Antequera|Malaga"
    "Ronda|Malaga"
    "Alameda|Malaga"
    "Alhaurin de la Torre|Malaga"
    "Alhaurin el Grande|Malaga"
    "Alora|Malaga"
    "Archidona|Malaga"
    "Ardales|Malaga"
    "Campillos|Malaga"
    "Cartama|Malaga"
    "Casarabonela|Malaga"
    "Coin|Malaga"
    "El Burgo|Malaga"
    "Fuente de Piedra|Malaga"
    "Humilladero|Malaga"
    "Mollina|Malaga"
    "Teba|Malaga"
    "Yunquera|Malaga"
    "Priego de Cordoba|Cordoba"
    "Iznajar|Cordoba"
    "Almedinilla|Cordoba"
    "Baena|Cordoba"
    "Cabra|Cordoba"
    "Carcabuey|Cordoba"
    "Castro Del Rio|Cordoba"
    "Encinas Reales|Cordoba"
    "Fuente-Tojar|Cordoba"
    "Lucena|Cordoba"
    "Luque|Cordoba"
    "Montilla|Cordoba"
    "Montoro|Cordoba"
    "Monturque|Cordoba"
    "Puente Genil|Cordoba"
    "Rute|Cordoba"
    "Santaella|Cordoba"
    "Zuheros|Cordoba"
    "Loja|Granada"
    "Montefrio|Granada"
    "Durcal|Granada"
    "Illora|Granada"
    "Moclin|Granada"
    "Salar|Granada"
    "Tozar|Granada"
    "Zagra|Granada"
    "Baza|Granada"
    "Guadix|Granada"
    "Alcala la Real|Jaen"
    "Alcaudete|Jaen"
    "Andujar|Jaen"
    "Arjona|Jaen"
    "Baeza|Jaen"
    "Bailen|Jaen"
    "Castillo de Locubin|Jaen"
    "Frailes|Jaen"
    "Jaen|Jaen"
    "Linares|Jaen"
    "Martos|Jaen"
    "Sabiote|Jaen"
    "Ubeda|Jaen"
    "Valdepenas de Jaen|Jaen"
    "Cazorla|Jaen"
    "Utrera|Sevilla"
    "Ecija|Sevilla"
    "Osuna|Sevilla"
    "Carmona|Sevilla"
    "Estepa|Sevilla"
    "Pruna|Sevilla"
    "Marchena|Sevilla"
    "Moron de la Frontera|Sevilla"
    "Lora del Rio|Sevilla"
    "Lebrija|Sevilla"
    "Sanlucar la Mayor|Sevilla"
    "Cazalla de la Sierra|Sevilla"
    "Constantina|Sevilla"
    "El Saucejo|Sevilla"
    "La Rambla|Sevilla"
    "Montemayor|Sevilla"
    "Aguilar de la Frontera|Sevilla"
    "Benameji|Sevilla"
    "Dona Mencia|Sevilla"
    "Espejo|Sevilla"
    "Fernan-Nunez|Sevilla"
    "La Carlota|Sevilla"
    "La Guijarrosa|Sevilla"
    "Valenzuela|Sevilla"
)

# Generate placeholder images for each area
for area_info in "${areas[@]}"; do
    IFS='|' read -r area province <<< "$area_info"
    filename=$(to_filename "$area")
    output_file="public/images/areas/${filename}.jpg"
    color=$(get_province_color "$province")
    area_encoded=$(urlencode "$area")
    province_encoded=$(urlencode "$province")
    
    # Skip if file already exists
    if [ ! -f "$output_file" ]; then
        echo "Generating placeholder for $area ($province)..."
        
        # Create a more professional placeholder with gradients and better typography
        curl -s "https://placehold.co/800x600/gradient-${color}/ffffff/png?\
layout=cover&\
font=montserrat&\
fontSize=52&\
fontWeight=700&\
text=${area_encoded}%0A%0A${province_encoded}%20Province" -o "$output_file"
        
        # Add a small delay to avoid rate limiting
        sleep 0.5
    fi
done

# Generate default image
if [ ! -f "public/images/areas/default.jpg" ]; then
    echo "Generating default placeholder..."
    curl -s "https://placehold.co/800x600/gradient-6B7280/ffffff/png?\
layout=cover&\
font=montserrat&\
fontSize=52&\
fontWeight=700&\
text=Area%20Image%20Coming%20Soon" -o "public/images/areas/default.jpg"
fi

echo "Done generating area images!" 