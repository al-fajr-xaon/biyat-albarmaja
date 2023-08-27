mod fetcher;

use neon::prelude::*;

#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_class("FetcherBuilder", fetcher::FetcherBuilder::register)?;
    Ok(())
}