StartupEvents.registry('item', event => {
  event.create('size_wand')
    .displayName(Component.of("Iku's Magical Wand").color('light_purple'))
    .glow(true)
    .maxStackSize(1)
})