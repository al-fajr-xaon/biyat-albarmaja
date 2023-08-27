mod google_query;
mod fake_people;

pub trait FetcherEngine {
    fn fetch<Query, Result>(&self, query: Query) -> Vec<Result>;
}

pub struct FetcherBuilder {
    engine: Box<dyn FetcherEngine>,
    use_threaded: bool,
}

impl FetcherBuilder {
    pub fn new(engine: Box<dyn FetcherEngine>) -> Self {
        FetcherBuilder {
            engine,
            use_threaded: true,
        }
    }

    pub fn set_use_threaded(&mut self, use_threaded: bool) -> &mut Self {
        self.use_threaded = use_threaded;
        self
    }
}

pub struct Fetcher {
    engine: Box<dyn FetcherEngine>,
    use_threaded: bool,
}

impl Fetcher {
    pub fn new(engine: Box<dyn FetcherEngine>, use_threaded: bool) -> Self {
        Fetcher {
            engine,
            use_threaded,
        }
    }

    pub fn fetch<Query, Result>(&self, query: Query) -> Vec<Result> {
        self.engine.fetch(query)
    }
}