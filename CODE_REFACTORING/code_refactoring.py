"""
	
	Desarrollado por: Camilo Andres Pulido Rodriguez
	<camilonosdocs@gmail.com>

	CODE REDACTORING
	Este punto lo refactorizo en python por temas de tiempo para entregarles la prueba lo más rápido
	ya que he utilizado Symfony2 y tengo amplia experiencia en PHP y porque realmente no he trabajado 
	 en Lavarel y tendría que revisar la doc del framework.


	 Respuestas

	 Que malas practicas puedo detectar:

	 1. no se evitan errores con bloques try/catch
	 2 Se realizan varias veces las mismas consultas la idea es que con el poder del ORM
	 se evite esto sino se utilice un objeto en memoria

	 3. Se validan objetos que pueden ser null y se hacen operaciones no necesarias

	 4. No se de Lavarel pero creo que no hay respuesta al final del codigo tengo dudas que hace el objeto Push como tal con las funciones ->ios y ->android2


	 Mejoras:

	 1. Ahora capturo errores

	 2. Se pueden colocar logger en los try/catch para conocer que puede estar pasando en produccion y tener claramente
	 	que pasa cuando se detectan fallas desde el endpoint que hace la solicitud post

	 3. Como ven reduje muchas lineas de codigo que se repiten varias veces y consultas que se hacen muchas veces


"""

def post_confirm(request):
	if request.method == 'POST':
		# Lo primero que hago es validar que si sea un request post para evitar 

		try:

			try:

				"""	
					Mejora 1:

					Una de las mejoras que haría es el manejo de excepciones que en 
					servicios transaccionales como este pueden ayudar a que los response del request post
					continuen su flujo normal sin que se generen exepciones y afecten el funcionamiento del software.
					de igual manera al manejar excepciones se pueden manejar temas como loggers para temas de analisis de 
					del comportamiento del aplicativo web como tal y así poder conocer en tiempo real posibles errores
					que no se han detectado en pruebas pero que se pueden corregir en producción

				"""
				id_driver =  request.POST.get('driver_id')
				servicio  = Service.objects.get(id  = request.POST.get('service_id'))

				if(servicio.statud_id == 6):
					"""
						Mejora dos compararia con tipos enteros es mas eficiente

					"""
				   return HttpResponse(json.dumps({'error': 2 }),content_type="application/json")

				if(servicio.drive_id == None and servicio.statud_id == 1):


					Service.objects.filter( id = servicio.id ).update(drive_id =   )
					"""
						Esta parte la modifico ya que en memoria mediante los objetos del ORM ya tengo una instancia del servicio
						y no tengo que realizar consultas no necesarias y consumo de recursos tanto en BD como
						el tiempo de ejecuciòn del request

					"""

					servicio.statud_id = 2
					servicio.drive_id = id_driver

					# Almaceno las modificaciones
					servicio.save()

					"""
						Valido si existe Driver
						sino retorno un error 


					"""
					try:

						driver = Driver.objects.get( id = id_driver )

						"""
							Esto lo hago segun el ejemplo pero colocando esta consulta arriba del update del servicio
							se pueden reducir unas operaciones no necesarias
						"""

						driver.available = '0' # Nuevamente estos estados los utilizaría como enteros
						driver.save()

						"""	
							Esta es la linea que si se hace la consulta de driver primero se puedde hacer en un solo update
						"""
						servicio.car_id = driver.id
						servicio.save()

						pushMensaje = "Tu servicio ha sido confirmado"

						push = Push()

						if servicio.user.uuid == "":
						    return HttpResponse(json.dumps({'error': 0 }),content_type="application/json")

						if servicio.user.type == "1":

							"""
								Aca segun pueddo identificar se hace el response push
								pero bajo mi criterio veo que lo crea mas no es se retorna o no
								se si internamente este response se envia al invocar el objeto push -> oios

							"""
							result  = push.ios(...)

						else:
							result  = push.android2(...)

						return HttpResponse(json.dumps({'error': 0 }),content_type="application/json")

					except Driver.DoesNotExist:
						"""
							No exisste el id del servicio de esta manera no se hacen mas operaciones sino sale del flujo del
							algoritmo y le retorn la respuesta al usuario

						"""
						


				else:
					return HttpResponse(json.dumps({'error': 1 }),content_type="application/json")


			except Service.DoesNotExist:
				"""
					No exisste el id del servicio de esta manera no se hacen mas operaciones sino sale del flujo del
					algoritmo y le retorn la respuesta al usuario

				"""

				
				return HttpResponse(json.dumps({'error': 3 }),content_type="application/json")
		 except Exception as error:
		 	"""
		 		Coloco una except  de la clase Exception para tratar de recoger cualquier tipo de error
		 		que se pueda presentar y el usuario sea notificado

		 	"""
		 	return HttpResponse(json.dumps({'error': 3 }),content_type="application/json")
           

	else:
		"""
			Una de las pequeñas mejoras que haría seria manejar los estados de error 
			como tipo INT ya que aunque visiblemente la comparación que se realizaría sea en un móvil o en el web endpoint
			que consuma el servicio puede mejorar un poco el rendimiento

		"""
		return HttpResponse(json.dumps({'error': 3 }),content_type="application/json")


