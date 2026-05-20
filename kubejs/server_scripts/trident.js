ItemEvents.rightClicked('kubejs:hand_of_isla_puss', event => {
  const player = event.player
  const level = player.level

  if (level.clientSide) return

  const result = player.rayTrace(50)

  if (!result || !result.block) return

  const x = result.block.x
  const y = result.block.y
  const z = result.block.z

  event.server.runCommandSilent(
    `execute in ${level.dimension} run summon minecraft:lightning_bolt ${x} ${y} ${z}`
  )

  player.swing()
})