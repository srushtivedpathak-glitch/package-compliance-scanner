import {
  Wheat,
  Droplets,
  Milk,
  Cookie,
  Sandwich,
  Coffee,
  CupSoda,
  Sparkles,
  Flame,
  Package,
} from 'lucide-react'

/**
 * getProductIcon
 *
 * Infers a decorative icon and color scheme based on product name keywords.
 * Purely cosmetic — never determines product category or compliance logic.
 *
 * @param {string|null|undefined} productName
 * @returns {{ icon: any, bg: string, color: string }}
 */
export function getProductIcon(productName = '') {
  if (!productName || typeof productName !== 'string') {
    return {
      icon: Package,
      bg: 'bg-teal-50',
      color: 'text-teal-primary',
    }
  }

  const name = productName.toLowerCase().trim()

  // Grains, Rice, Atta, Flour, Wheat
  if (
    name.includes('rice') ||
    name.includes('wheat') ||
    name.includes('flour') ||
    name.includes('atta') ||
    name.includes('grain') ||
    name.includes('paddy') ||
    name.includes('dal') ||
    name.includes('pulse')
  ) {
    return {
      icon: Wheat,
      bg: 'bg-emerald-50',
      color: 'text-brand-success',
    }
  }

  // Oil, Ghee, Fats
  if (name.includes('oil') || name.includes('ghee') || name.includes('fat') || name.includes('mustard')) {
    return {
      icon: Droplets,
      bg: 'bg-amber-50',
      color: 'text-amber-500',
    }
  }

  // Milk, Dairy, Paneer, Curd, Butter
  if (
    name.includes('milk') ||
    name.includes('dairy') ||
    name.includes('curd') ||
    name.includes('paneer') ||
    name.includes('butter') ||
    name.includes('cheese') ||
    name.includes('yogurt')
  ) {
    return {
      icon: Milk,
      bg: 'bg-teal-light',
      color: 'text-teal-primary',
    }
  }

  // Biscuits, Cookies, Wafers
  if (
    name.includes('biscuit') ||
    name.includes('cookie') ||
    name.includes('wafer') ||
    name.includes('rusk') ||
    name.includes('cracker')
  ) {
    return {
      icon: Cookie,
      bg: 'bg-amber-50',
      color: 'text-amber-600',
    }
  }

  // Bread, Bakery, Bun, Cake
  if (
    name.includes('bread') ||
    name.includes('bakery') ||
    name.includes('bun') ||
    name.includes('cake') ||
    name.includes('toast')
  ) {
    return {
      icon: Sandwich,
      bg: 'bg-orange-50',
      color: 'text-orange-600',
    }
  }

  // Soap, Detergent, Cleaner, Wash
  if (
    name.includes('soap') ||
    name.includes('detergent') ||
    name.includes('surf') ||
    name.includes('wash') ||
    name.includes('clean') ||
    name.includes('shampoo')
  ) {
    return {
      icon: Sparkles,
      bg: 'bg-amber-50',
      color: 'text-amber-500',
    }
  }

  // Tea, Coffee, Chai
  if (name.includes('coffee') || name.includes('tea') || name.includes('chai') || name.includes('brew')) {
    return {
      icon: Coffee,
      bg: 'bg-amber-50',
      color: 'text-amber-700',
    }
  }

  // Juice, Drink, Beverage, Soda
  if (
    name.includes('juice') ||
    name.includes('drink') ||
    name.includes('beverage') ||
    name.includes('soda') ||
    name.includes('water')
  ) {
    return {
      icon: CupSoda,
      bg: 'bg-teal-50',
      color: 'text-teal-primary',
    }
  }

  // Spices, Masala, Pepper, Salt
  if (name.includes('spice') || name.includes('masala') || name.includes('chilli') || name.includes('pepper')) {
    return {
      icon: Flame,
      bg: 'bg-rose-50',
      color: 'text-rose-500',
    }
  }

  // Default generic package icon
  return {
    icon: Package,
    bg: 'bg-teal-50',
    color: 'text-teal-primary',
  }
}

