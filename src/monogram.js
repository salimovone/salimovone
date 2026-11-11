import {
  AmbientLight,
  DirectionalLight,
  ExtrudeGeometry,
  Mesh,
  MeshStandardMaterial,
  OrthographicCamera,
  Scene,
  Shape,
  Vector2,
  WebGLRenderer,
} from 'three'

export function mountMonogram(plate) {
  const renderer = new WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'low-power',
  })
  const canvas = renderer.domElement
  canvas.setAttribute('aria-hidden', 'true')
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  const outline = [
    [32, 0],
    [144, 0],
    [144, 32],
    [48, 32],
    [48, 64],
    [112, 64],
    [144, 96],
    [144, 144],
    [112, 176],
    [0, 176],
    [0, 144],
    [96, 144],
    [96, 112],
    [32, 112],
    [0, 80],
    [0, 32],
  ]
  const shape = new Shape(outline.map(([x, y]) => new Vector2(x, -y)))
  shape.closePath()
  const geometry = new ExtrudeGeometry(shape, {
    depth: 24,
    bevelSize: 2,
    bevelThickness: 2,
    bevelSegments: 3,
  })
  geometry.center()
  const face = new MeshStandardMaterial({
    color: 0xafbeff,
    metalness: 0.2,
    roughness: 0.32,
  })
  const edge = new MeshStandardMaterial({
    color: 0x586ec1,
    metalness: 0.28,
    roughness: 0.38,
  })
  const letter = new Mesh(geometry, [face, edge])
  const scene = new Scene()
  scene.add(letter, new AmbientLight(0xd6dcff, 1.2))
  const key = new DirectionalLight(0xc5eeff, 2.6)
  key.position.set(-2, 4, 5)
  const rim = new DirectionalLight(0xa88cff, 2)
  rim.position.set(3, -1, 1)
  scene.add(key, rim)
  const camera = new OrthographicCamera(-145, 145, 120, -120, 1, 800)
  camera.position.z = 360
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
  let pointerX = 0
  let pointerY = 0
  let frame = 0
  let lost = false

  function draw() {
    frame = 0
    if (lost) return
    letter.rotation.set(-0.18 + pointerY * 0.18, -0.32 + pointerX * 0.28, 0.12)
    renderer.render(scene, camera)
  }
  function schedule() {
    if (!frame && !lost) frame = requestAnimationFrame(draw)
  }
  function reset() {
    pointerX = pointerY = 0
    schedule()
  }
  function move(event) {
    if (motion.matches || event.pointerType === 'touch') return
    const rect = plate.getBoundingClientRect()
    pointerX = (2 * (event.clientX - rect.left)) / rect.width - 1
    pointerY = (2 * (event.clientY - rect.top)) / rect.height - 1
    schedule()
  }
  function resize() {
    const { clientWidth: width, clientHeight: height } = plate
    if (!width || !height || lost) return
    camera.right = (120 * width) / height
    camera.left = -camera.right
    camera.updateProjectionMatrix()
    renderer.setSize(width, height, false)
    draw()
  }
  function contextLost() {
    lost = true
    canvas.hidden = true
  }
  function restored() {
    lost = false
    resize()
    canvas.hidden = false
  }
  resize()
  plate.append(canvas)
  const observer = new ResizeObserver(resize)
  observer.observe(plate)
  plate.addEventListener('pointermove', move)
  plate.addEventListener('pointerleave', reset)
  motion.addEventListener('change', reset)
  canvas.addEventListener('webglcontextlost', contextLost)
  canvas.addEventListener('webglcontextrestored', restored)
  return () => {
    observer.disconnect()
    cancelAnimationFrame(frame)
    plate.removeEventListener('pointermove', move)
    plate.removeEventListener('pointerleave', reset)
    motion.removeEventListener('change', reset)
    canvas.removeEventListener('webglcontextlost', contextLost)
    canvas.removeEventListener('webglcontextrestored', restored)
    geometry.dispose()
    face.dispose()
    edge.dispose()
    renderer.dispose()
    canvas.remove()
  }
}
