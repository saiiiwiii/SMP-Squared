StartupEvents.registry('entity_type', event => {
  event.create('migo_ice_projectile', 'entityjs:projectile')
    .clientTrackingRange(8)
    .mobCategory('misc')
    .sized(0.25, 0.25)
    .renderScale(1, 1, 1)
    .updateInterval(1)

    // Use vanilla snowball texture
    .textureLocation(entity => {
      return 'minecraft:textures/item/snowball.png'
    })

    // Allow projectile to hit entities
    .canHitEntity(entity => {
      return true
    })

    // When projectile hits entity
    .onHitEntity(context => {
      const { entity, result } = context

      if (result.entity && result.entity.living) {

        // Tiny damage so hit/knockback registers
        result.entity.attack(0.01)

        // Apply slowness
        result.entity.potionEffects.add(
          'minecraft:slowness',
          100,
          2,
          false,
          true
        )
      }

      // Remove projectile after hit
      entity.discard()
    })

    // Remove projectile when hitting blocks
    .onHitBlock(context => {
      const { entity } = context
      entity.discard()
    })
})