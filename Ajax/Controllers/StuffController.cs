using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Ajax.Controllers
{
	public class StuffDto
	{
		public int Id { get; set; }
		public string Name { get; set; }
	}

    public class StuffController : ApiController
    {
        // GET: api/Stuff
		[HttpGet]
        public IEnumerable<string> Get()
        {
			return new string[] { "value1", "value2" };
        }

        // GET: api/Stuff/5
        public string Get(int id)
        {
            return "value";
        }

		// http://encosia.com/using-jquery-to-post-frombody-parameters-to-web-api/
		[HttpPost]
		[Route("api/Stuff/PostSimple")]
		// POST: api/Stuff/Simple
		public void PostSimple([FromBody]string value)
		{
			Debugger.Break();
		}

	    public void Post(StuffDto stuff)
	    {
		    Debugger.Break();
	    }

        // PUT: api/Stuff/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Stuff/5
        public void Delete(int id)
        {
        }
    }
}
