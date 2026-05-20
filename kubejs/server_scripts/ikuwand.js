const allowedPlayers = ['Ikurah_ikuy', 'Saiuwu']
const wand = 'kubejs:size_wand'
const range = 8

// Handle right-click on entities (including mobs)
ItemEvents.entityInteracted(wand, event => {
  const player = event.player
  if (player.level.clientSide) return
  if (!allowedPlayers.includes(player.username)) return
  
  const target = event.target
  
  // Check if target is an entity
  if (target && target.isLiving()) {
    // Toggle the entity size first
    if (target.uuid.toString() != player.uuid.toString()) {
      toggleEntitySize(target, event.server)
    } else {
      toggleEntitySize(player, event.server)
    }
    
    // Cancel AFTER toggling to prevent default interaction
    event.cancel()
  }
})

// Handle right-click on blocks/air for self toggle
ItemEvents.rightClicked(wand, event => {
  const player = event.player
  if (player.level.clientSide) return
  if (!allowedPlayers.includes(player.username)) return
  
  // Ray trace to check if clicking on an entity
  const hit = player.rayTrace(range, true)
  
  // Only toggle self if not clicking on an entity
  if (!hit || !hit.entity) {
    toggleEntitySize(player, event.server)
  }
})

function toggleEntitySize(target, server) {
  const uuid = target.uuid.toString()
  const data = target.persistentData
  const isSmall = data.getInt('ikuSmallMode') == 1

  if (!isSmall) {
    server.runCommandSilent(`execute as ${uuid} run scale set pehkui:base 0.4 @s`)
    server.runCommandSilent(`execute as ${uuid} run scale set pehkui:motion 2 @s`)
    server.runCommandSilent(`execute as ${uuid} run scale set pehkui:jump_height 2 @s`)
    server.runCommandSilent(`execute as ${uuid} run scale set pehkui:step_height 2.5 @s`)
    server.runCommandSilent(`execute as ${uuid} run scale set pehkui:reach 2 @s`)
    server.runCommandSilent(`execute as ${uuid} run scale set pehkui:block_reach 2 @s`)
    server.runCommandSilent(`execute as ${uuid} run scale set pehkui:entity_reach 2 @s`)
    server.runCommandSilent(`execute as ${uuid} run playsound minecraft:entity.enderman.teleport player @s`)
    data.putInt('ikuSmallMode', 1)
  } else {
    server.runCommandSilent(`execute as ${uuid} run scale set pehkui:base 1 @s`)
    server.runCommandSilent(`execute as ${uuid} run scale set pehkui:motion 1 @s`)
    server.runCommandSilent(`execute as ${uuid} run scale set pehkui:jump_height 1 @s`)
    server.runCommandSilent(`execute as ${uuid} run scale set pehkui:step_height 1 @s`)
    server.runCommandSilent(`execute as ${uuid} run scale set pehkui:reach 1 @s`)
    server.runCommandSilent(`execute as ${uuid} run scale set pehkui:block_reach 1 @s`)
    server.runCommandSilent(`execute as ${uuid} run scale set pehkui:entity_reach 1 @s`)
    server.runCommandSilent(`execute as ${uuid} run playsound minecraft:entity.player.levelup player @s`)
    data.putInt('ikuSmallMode', 0)
  }
}