ItemEvents.rightClicked('kubejs:migo_staff', event => {
  const player = event.player
  const level = event.level

  if (level.clientSide) return

  const hit = player.rayTrace(5)
  if (!hit || !hit.block) return

  const block = hit.block

  let px = block.x
  let py = block.y
  let pz = block.z

  // Convert flowing water into source block
  if (block.id == 'minecraft:water') {
    level.server.runCommandSilent(
      `execute in ${level.dimension} run setblock ${px} ${py} ${pz} minecraft:water[level=0]`
    )

    player.swing()
    return
  }

  // Otherwise place water beside clicked face
  const side = hit.facing

  if (side == 'up') py++
  if (side == 'down') py--
  if (side == 'north') pz--
  if (side == 'south') pz++
  if (side == 'east') px++
  if (side == 'west') px--

  level.server.runCommandSilent(
    `execute in ${level.dimension} run setblock ${px} ${py} ${pz} minecraft:water[level=0]`
  )

  player.swing()
})


// LEFT CLICK = SHOOT ICE PROJECTILE
ItemEvents.firstLeftClicked('kubejs:migo_staff', event => {
  const player = event.player
  const level = event.level
  if (level.clientSide) return

  const look = player.getLookAngle()

  const mx = look.x() * 2.2
  const my = look.y() * 2.2
  const mz = look.z() * 2.2

  const sx = player.x + look.x() * 1.2
  const sy = player.eyeY - 0.2
  const sz = player.z + look.z() * 1.2

  level.server.runCommandSilent(
    `execute in ${level.dimension} positioned ${sx} ${sy} ${sz} run summon kubejs:migo_ice_projectile ~ ~ ~ {Motion:[${mx}d,${my}d,${mz}d]}`
  )

  player.swing()
})